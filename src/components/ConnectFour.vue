<template>
  <div class="options">
    <select :disabled="gameStarted" v-model="playerOneOption">
    <option>Human</option>
    <option>AI Depth 1</option>
    <option>AI Depth 2</option>
    <option>AI Depth 3</option>
    </select>
    <button :disabled="buttonDisabled" class="button" role="button" @click="startOrRestart">{{buttonText}}</button>
    <select :disabled="gameStarted" v-model="playerTwoOption">
      <option>Human</option>
      <option>AI Depth 1</option>
      <option>AI Depth 2</option>
      <option>AI Depth 3</option>
    </select>
  </div>
  <div class="loader-wrapper">
    <div v-if="isLoading" class="throbber-loader"></div>
  </div>
  <div style="height: 2rem; padding-top: 0.5rem;">{{ victoryText }}</div>
  <div class="connect-four">
    <div 
    @click="playerMove(colIndex)" 
    v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" 
    :class="['column', 
    {'y': validateYellow && isValidMove(colIndex)}, 
    {'r': validateRed && isValidMove(colIndex)}]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" 
      :class="[{red: game[colIndex][rowIndex] == 1, yellow: game[colIndex][rowIndex] == 2, 'most-recent': mostRecent[0] == colIndex && mostRecent[1] == rowIndex}, 'circle']"/>
    </div>
  </div>
</template>

<script>
const worker = new Worker("agent.js");
import { toRaw } from "vue";
export default {
  name: 'Connect Four',
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
      playerTwoOption: "AI Depth 3",
      isLoading: false
    }
  },
  methods: {
    makeMove(colIndex) {
      if (!this.gameOver && this.isValidMove(colIndex)) {
        this.placeTile(colIndex)
        this.redPlayer = !this.redPlayer;
        if (this.redPlayer && this.playerOneOption != "Human" && !this.gameOver) {
          this.agentMove();
        } else if (!this.redPlayer && this.playerTwoOption != "Human" && !this.gameOver) {
          this.agentMove();
        }
      }
    },
    playerMove(colIndex) {
      if (this.boardUnlocked) {
        this.makeMove(colIndex)
      }
    },
    resetGame() {
      this.redPlayer = true;
      this.mostRecent[0,1] = -1;
      worker.terminate();
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
      console.log("Starting up the worker...")
      let validMoves = this.getValidMoves();
      worker.postMessage([validMoves, toRaw(this.game)])
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
    redWon() {
      return this.isWinningState(1);
    },
    yellowWon() {
      return this.isWinningState(2);
    },
    victoryText() {
      if (this.redWon) {
        return "Red wins!";
      } else if (this.yellowWon) {
        return "Yellow wins!";
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
    winningColor() {
      if (this.redWon) {
        return 'rgb(250, 86, 86);';
      } else {
        return 'rgb(255, 255, 121)';
      }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  gap: 15vw;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 1px;
  outline: 2px solid transparent;
  border-radius: 5px;
}
.circle {
  border: 2px solid rgb(157, 157, 157);
  height: 12vh;
  width: 12vh;
  border-radius: 100%;
}
.most-recent {
  border-color: #5df0ba;
}
.red {
  background-color: rgb(250, 86, 86);
}
.yellow {
  background-color: rgb(255, 255, 121);
}
.y:hover {
  outline-color: rgb(255, 255, 121);
  cursor: pointer;
}
.r:hover {
  outline-color: rgb(250, 86, 86);
  cursor: pointer;
}

/* CSS */
.button {
  background: #5df0ba;
  border-radius: 999px;
  box-shadow: #4ab78f 0 10px 20px -10px;
  box-sizing: border-box;
  color: #FFFFFF;
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
  width: 6rem;
  word-break: break-word;
  border: 0;
  max-height: 3rem;
}

.button:hover {
  background: #50cc9f;
  box-shadow: #3b9373 0 10px 20px -10px;
}

.button:disabled {
  background: rgb(157, 157, 157);
  box-shadow: rgb(78, 77, 77) 0 10px 20px -10px;
}

.loader-wrapper {
  height: 1rem;
  margin-top: 1rem;
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

</style>
