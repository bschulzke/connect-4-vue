<template>
  <div :style="{ 
    '--p1': playerOneColor, 
    '--yellow': playerTwoColor, 
    '--border': border,
    '--green': green, 
    '--green-hover': greenHover, 
    '--white': white,
    '--overlay': overlay,
    '--grey': grey,
    '--text-color': textColor 
    }">
    <div @click="playerOneColorPicker = false; playerTwoColorPicker = false;" v-if="playerOneColorPicker || playerTwoColorPicker" class="overlay">
      <div @click.prevent.stop class="color-picker" v-if="playerOneColorPicker">
        <font-awesome-icon @click="playerOneColorPicker = false" icon="fa-solid fa-x"/>
        <div 
        v-for="color in p1ColorOptions" 
        v-bind:key="color" 
        :class="['big-tile', {'green-border': color == playerOneColor}]" 
        :style="{ 'background-color': color }"
        @click="playerOneColor = color"
        />
      </div>
      <div @click.prevent.stop class="color-picker" v-if="playerTwoColorPicker">
        <font-awesome-icon @click="playerTwoColorPicker = false" icon="fa-solid fa-x" />
        <div 
        v-for="color in p2ColorOptions" 
        v-bind:key="color" 
        :class="['big-tile', {'green-border': color == playerTwoColor}]" 
        :style="{ 'background-color': color }"
        @click="playerTwoColor = color"
        />
      </div>
    </div>
    <div class="options">
    <div class="player-selection">
      <div class="dropdown-wrapper">
        <div @click="playerOneColorPicker = true" class="red-circle small-tile"/>
        <select :disabled="optionsDisabled" v-model="playerOneOption">
          <option>Human</option>
          <option>AI</option>
        </select>
      </div>
    <div v-if="playerOneOption == 'AI'" class="slider-wrapper">
      <input :disabled="optionsDisabled" v-model="playerOneLevel" type="range" id="al" name="a1" min="1" max="5">    
      <label disabled="true" for="a1">Difficulty</label>
    </div>
    </div>
    <button :disabled="buttonDisabled" class="button" role="button" @click="startOrRestart">{{buttonText}}</button>
    <div class="player-selection">
      <div class="dropdown-wrapper">
        <div @click="playerTwoColorPicker = true" class="yellow-circle small-tile"/>
        <select :disabled="optionsDisabled" v-model="playerTwoOption">
          <option>Human</option>
          <option>AI</option>
        </select>
      </div>
      <div v-if="playerTwoOption == 'AI'" class="slider-wrapper">
        <input :disabled="optionsDisabled" v-model="playerTwoLevel" type="range" id="al" name="a1" min="1" max="5">    
        <label disabled="true" for="a1">Difficulty</label>
      </div>
    </div>
  </div>
  <div class="loader-wrapper">
    <div v-if="isLoading" class="throbber-loader"></div>
  </div>
  <div class="victory-text">{{ victoryText }}</div>
  <div class="connect-four">
    <div 
    @click="playerMove(colIndex)" 
    v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" 
    :class="['column', 
    {'y': validateYellow && isValidMove(colIndex)}, 
    {'r': validateRed && isValidMove(colIndex)}]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" 
      :class="[
        {red: game[colIndex][rowIndex] == 1, yellow: game[colIndex][rowIndex] == 2, 
          'green-border': mostRecent[0] == colIndex && mostRecent[1] == rowIndex},
         'circle'
         ]"/>
    </div>
  </div>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

let worker = new Worker("agent.js");
import { toRaw } from "vue";
export default {
  name: 'Connect Four',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      game: [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ],
      redPlayer: true,
      mostRecent: [-1,-1],
      playerOneOption: "Human",
      playerTwoOption: "AI",
      isLoading: false,
      playerOneLevel: 3,
      playerTwoLevel: 3,
      playerOneColorPicker: false,
      playerTwoColorPicker: false,
      greenHover: '#50cc9f',
      white: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
      grey: 'rgb(157, 157, 157)',
      playerOneColor: 'rgb(255, 45, 45)',
      playerTwoColor: 'rgb(255, 255, 121)',
      colorOptions: ['rgb(255, 45, 45)', 'rgb(255, 255, 121)', '#E6E6FA', '#f88379', '#9FE2BF', '#89cff0']
    }
  },
  methods: {
    makeMove(colIndex) {
      if (!this.gameOver && this.isValidMove(colIndex)) {
        this.placeTile(colIndex);
        this.redPlayer = !this.redPlayer;
        if (this.redPlayer && this.playerOneOption != "Human" && !this.gameOver) {
          this.agentMove();
        } else if (!this.redPlayer && this.playerTwoOption != "Human" && !this.gameOver) {
          this.agentMove();
        }
      } else {
        this.restartWorker();
      }
    },
    restartWorker() {
      worker.terminate();
      worker = new Worker("agent.js");
      this.loading = false;
    },
    playerMove(colIndex) {
      if (this.boardUnlocked) {
        this.makeMove(colIndex)
      }
    },
    resetGame() {
      this.redPlayer = true;
      this.mostRecent[0,1] = -1;
      this.restartWorker();
      this.game = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ]
    },
    startOrRestart() {
      if (this.playerOneOption == "Human" || this.gameStarted) {
        this.resetGame();
      } else {
        this.agentMove();
      }
    },
    getValidMoves() {
      const validMoves = [];
      for (let c = 0; c < 7; c++) {
          if (this.board.some(row => row[c] === 0)) {
              validMoves.push(c);
          }
      }
      return validMoves;
    },
    agentMove() {
      let validMoves = this.getValidMoves();
      let message = [validMoves, toRaw(this.game), this.player, this.otherPlayer, this.playerDepth];
      console.log("Starting up the worker...")
      worker.postMessage(message);
      this.isLoading = true;
      worker.onmessage = (e) => {
        console.log("Agent worker chose move: " + e.data);
        this.makeMove(e.data);
        this.isLoading = false;
      }
    },
    placeTile(colIndex) {
      if (this.game[colIndex][0] == 0) {
        let rowIndex = this.getRowForMove(colIndex);
        this.mostRecent[0] = colIndex;
        this.mostRecent[1] = rowIndex;
        this.game[colIndex][rowIndex] = this.player
      }
    },
    isValidMove(colIndex) {
      return this.game[colIndex].includes(0)
    },
    getRowForMove(colIndex) {
      if (this.game[colIndex][5] == 0) {
        return 5;
      } else if (this.game[colIndex][4] == 0) {
        return 4;
      } else if (this.game[colIndex][3] == 0) {
        return 3;
      } else if (this.game[colIndex][2] == 0) {
        return 2;
      } else if (this.game[colIndex][1] == 0) {
        return 1;
      } else if (this.game[colIndex][0] == 0) {
        return 0;
      }
    },
    isWinningState(playerNum) {
    const playerWinStr = `${playerNum}${playerNum}${playerNum}${playerNum}`;

    function checkHorizontal(b) {
        for (const row of b) {
            if (row.join('').includes(playerWinStr)) {
                return true;
            }
        }
        return false;
    }

    function checkVertical(b) {
        return checkHorizontal(b[0].map((_, i) => b.map(row => row[i])));
    }

    function checkDiagonal(b) {
      for (let op of [null, (board) => [...board].map(row => row.reverse())]) {
          let opBoard = op ? op([...b]) : [...b];

          let rootDiag = opBoard.map((row, i) => row[i]).map(Number);
          if (rootDiag.join('').includes(playerWinStr)) {
              return true;
          }

          for (let i = 1; i <= b[0].length - 3; i++) {
              for (let offset of [i, -i]) {
                  let diag = opBoard.map((row, j) => row[j + offset]).map(Number);
                  if (diag.join('').includes(playerWinStr)) {
                      return true;
                  }
              }
          }
      }

      return false;
    }

    return checkHorizontal(this.board) || checkVertical(this.board) || checkDiagonal(this.board);
    },
  },                    
  computed: {
    player() {
      if (!this.gameOver) {
        if (this.redPlayer) {
        return 1;
        } else {
          return 2;
        }
      } else {
        return 0;
      }
    },
    otherPlayer() {
      if (!this.gameOver) {
        if (this.redPlayer) {
        return 2;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    },
    playerDepth() {
      if (this.redPlayer) {
        return this.playerOneLevel;
      } else {
        return this.playerTwoLevel;
      }
    },
    redWon() {
      return this.isWinningState(1);
    },
    yellowWon() {
      return this.isWinningState(2);
    },
    victoryText() {
      if (this.redWon) {
        return "Player One wins!";
      } else if (this.yellowWon) {
        return "Player Two wins!";
      } else if (this.tied) {
        return "Cat's game!";
      } else {
        return "";
      }
    },
    gameStarted() {
      for (let row of this.game) {
        if (row.includes(1) || row.includes(2)) {
          return true;
        }
      }
      return false;
    },
    tied() {
      for (let row of this.game) {
        if (row.includes(0)) {
          return false;
        }
      }
      return true;
    },
    gameOver() {
      return this.redWon || this.yellowWon || this.tied
    },
    board() {
      return JSON.parse(JSON.stringify(this.game));
    },
    validateYellow() {
      return this.player == 2 && this.playerTwoOption == "Human";
    },
    validateRed() {
      return this.player == 1 && this.playerOneOption == "Human";
    },
    buttonDisabled() {
      return !this.gameStarted && !this.aiStarts;
    },
    aiStarts() {
      return this.playerOneOption != "Human";
    },
    buttonText() {
      if (this.aiStarts && !this.gameStarted) {
        return "Start";
      } else {
        return "Restart";
      }
    },
    boardUnlocked() {
      return !this.isLoading && this.humanTurn
    },
    humanTurn() {
      if (this.redPlayer) {
        return this.playerOneOption == "Human";
      } else {
        return this.playerTwoOption == "Human"
      }
    },
    optionsDisabled() {
      return this.gameStarted && !this.gameOver
    },
    green() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'rgb(56, 167, 126)';
      }
      return '#5df0ba';
    },
    border() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return '#FFFFFF';
      } else {
        return 'rgb(157, 157, 157)';
      }
    },
    textColor() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return '#FFFFFF';
      } else {
        return 'black';
      }
    },
    p1ColorOptions() {
      let options = JSON.parse(JSON.stringify(this.colorOptions));
      return options.filter(color => color !== this.playerTwoColor);
    },
    p2ColorOptions() {
      let options = JSON.parse(JSON.stringify(this.colorOptions));
      return options.filter(color => color !== this.playerOneColor);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*
  greyscale filters:
  -moz-filter: grayscale(90%);
  -webkit-filter: grayscale(90%);
  filter: grayscale(90%); */

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay);
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-picker {
  height: 12rem;
  width: 24rem;
  background-color: var(--white);
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: rgb(255, 45, 45);
}

.fa-x {
  color: var(--grey);
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 1rem;
  padding-top: 1rem;
}

.fa-x:hover {
  cursor: pointer;
}

label {
  font-size: 0.8rem;
  color: var(--grey);
}
.connect-four {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 100%;
}
.options {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 13.5vw;
}

.victory-text {
  height: 2rem; 
  padding-top: 0.5rem;
  color: var(--text-color);
}

.player-selection {
  display: flex;
  flex-direction: column;
  width: 6rem;
}

.dropdown-wrapper {
  display: flex;
  gap: 0.5rem;
}

.slider-wrapper {
  display: flex;
  flex-direction: column;
  height: 1rem;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 1px;
  outline: 2px solid transparent;
  border-radius: 5px;
}
.circle {
  border: 2px solid var(--border);
  height: 12vh;
  width: 12vh;
  border-radius: 100%;
}
.red {
  background-color: var(--p1);
}
.yellow {
  background-color: var(--yellow);
}
.y:hover {
  outline-color: var(--yellow);
  cursor: pointer;
}
.r:hover {
  outline-color: var(--p1);
  cursor: pointer;
}

/* CSS */
.button {
  background: var(--green);
  border-radius: 999px;
  box-sizing: border-box;
  color: var(--white);
  cursor: pointer;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 2rem;
  opacity: 1;
  outline: 0 solid transparent;
  padding: 0.5rem;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  min-width: 6rem;
  word-break: break-word;
  border: 0;
  max-height: 3rem;
}

.button:hover {
  background: var(--green-hover);
}

.button:disabled {
  background: var(--grey);
}

.loader-wrapper {
  height: 1rem;
  margin-top: 1rem;
}

.small-tile {
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border: 1px solid var(--border);
}

.big-tile {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 2px solid var(--border);
}

.big-tile:hover {
  cursor: pointer;
  border-color: var(--green);
}

.small-tile:hover {
  cursor: pointer;
}

.red-circle {
  background-color: var(--p1);
}

.yellow-circle {
  background-color: var(--yellow);
}

/* Copyright (c) 2013 John W. Long and Julia Elman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
@-moz-keyframes throbber-loader {
  0% {
    background: #dde2e7;
  }
  10% {
    background: #6b9dc8;
  }
  40% {
    background: #dde2e7;
  }
}
@-webkit-keyframes throbber-loader {
  0% {
    background: #dde2e7;
  }
  10% {
    background: #6b9dc8;
  }
  40% {
    background: #dde2e7;
  }
}
@keyframes throbber-loader {
  0% {
    background: #dde2e7;
  }
  10% {
    background: #6b9dc8;
  }
  40% {
    background: #dde2e7;
  }
}
/* :not(:required) hides these rules from IE9 and below */
.throbber-loader:not(:required) {
  -moz-animation: throbber-loader 2000ms 300ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 300ms infinite ease-out;
  animation: throbber-loader 2000ms 300ms infinite ease-out;
  background: #dde2e7;
  display: inline-block;
  position: relative;
  text-indent: -9999px;
  width: 0.9em;
  height: 1.5em;
  margin: 0 1.6em;
}
.throbber-loader:not(:required):before, .throbber-loader:not(:required):after {
  background: #dde2e7;
  content: '\x200B';
  display: inline-block;
  width: 0.9em;
  height: 1.5em;
  position: absolute;
  top: 0;
}
.throbber-loader:not(:required):before {
  -moz-animation: throbber-loader 2000ms 150ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 150ms infinite ease-out;
  animation: throbber-loader 2000ms 150ms infinite ease-out;
  left: -1.6em;
}
.throbber-loader:not(:required):after {
  -moz-animation: throbber-loader 2000ms 450ms infinite ease-out;
  -webkit-animation: throbber-loader 2000ms 450ms infinite ease-out;
  animation: throbber-loader 2000ms 450ms infinite ease-out;
  right: -1.6em;
}

.green-border {
  border-color: var(--green);
}

@media only screen 
and (max-width : 1200px) {
  .circle {
    height: 12vw;
    width: 12vw;
  }
  .y:hover {
    outline-color: transparent;
  }
  .r:hover {
    outline-color: transparent;
  }
}

@media only screen 
and (max-width : 400px) {
  .options {
    gap: 10vw;
  }
  .color-picker {
    width: 22rem;
  }
}
@media only screen 
and (min-width: 901px)
and (max-width : 1100px) {
  .circle {
    height: 10vw;
    width: 10vw;
  }
  .y:hover {
    outline-color: transparent;
  }
  .r:hover {
    outline-color: transparent;
  }
}

@media only screen
and (max-width: 375px) {
  .options {
  gap: 8vw;
}
}

</style>
