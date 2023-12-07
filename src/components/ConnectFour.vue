<template>
  <div :style="{ 
    '--p1': playerOneColor, 
    '--p2': playerTwoColor, 
    '--border': border,
    '--green': green, 
    '--green-hover': greenHover, 
    '--white': white,
    '--overlay': overlay,
    '--grey': grey,
    '--text-color': textColor 
  }">
  <font-awesome-icon :disabled="!humanTurn" role="button" @click="getHint" icon="fa-solid fa-lightbulb" />
  <a href="https://github.com/bschulzke/connect-4-vue" target="_blank"><font-awesome-icon icon="fa-brands fa-github" /></a>
    <div @click="playerOneColorPicker = false; playerTwoColorPicker = false;" v-if="playerOneColorPicker || playerTwoColorPicker" class="overlay">
      <ColorPicker v-if="playerOneColorPicker" :colorOptions="p1ColorOptions" :playerColor="playerOneColor" 
        @color="(color) => playerOneColor = color" @close="playerOneColorPicker = false"/>
      <ColorPicker v-if="playerTwoColorPicker" :colorOptions="p2ColorOptions" :playerColor="playerTwoColor" 
        @color="(color) => playerTwoColor = color" @close="playerTwoColorPicker = false"/>
    </div>
    <div class="options">
    <div class="player-selection">
    <PlayerSelector :optionsDisabled="optionsDisabled" @input="(value) => playerOneOption = value"/>
    <div v-if="playerOneOption === 'AI'" class="slider-wrapper">
      <input :disabled="optionsDisabled" v-model="playerOneLevel" type="range" id="al" name="a1" min="0" max="5">    
      <label disabled="true" for="a1">Difficulty</label>
    </div>
    </div>
    <button :disabled="buttonDisabled" class="button" role="button" @click="startOrRestart">{{buttonText}}</button>
    <div class="player-selection">
      <PlayerSelector :optionsDisabled="optionsDisabled" @input="(value) => playerTwoOption = value"/>
      <div v-if="playerTwoOption == 'AI'" class="slider-wrapper">
        <input :disabled="optionsDisabled" v-model="playerTwoLevel" type="range" id="al" name="a1" min="0" max="5">    
        <label disabled="true" for="a1">Difficulty</label>
      </div>
    </div>
  </div>
  <div class="loader-wrapper">
    <div v-if="isLoading || (!humanTurn && gameStarted && !gameOver)" class="throbber-loader"></div>
  </div>
  <div class="victory-text">{{ victoryText }}</div>
  <div class="connect-four">
    <div 
    @click="playerMove(colIndex)" 
    v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" 
    :class="['column', 
    {'y': validateYellow && isValidMove(colIndex)}, 
    {'r': validateRed && isValidMove(colIndex)},
    {'hint': hint == colIndex}
    ]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" 
      :class="[
        {p1: game[colIndex][rowIndex] == 1, p2: game[colIndex][rowIndex] == 2, faded: gameOver,
          'green-border': mostRecent[0] == colIndex && mostRecent[1] == rowIndex},
         'circle'
         ]"/>
    </div>
  </div>
  </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import  ColorPicker from './ColorPicker.vue'
import PlayerSelector from './PlayerSelector.vue'

let worker = new Worker("agent.js");
import { toRaw } from "vue";
export default {
  name: 'ConnectFour',
  components: {
    FontAwesomeIcon,
    ColorPicker,
    PlayerSelector
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
      playerOneLevel: 1,
      playerTwoLevel: 1,
      playerOneColorPicker: false,
      playerTwoColorPicker: false,
      greenHover: '#50cc9f',
      white: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
      grey: 'rgb(157, 157, 157)',
      playerOneColor: 'rgb(255, 45, 45)',
      playerTwoColor: 'rgb(255, 255, 121)',
      colorOptions: ['rgb(255, 45, 45)', 'rgb(255, 255, 121)', '#E6E6FA', '#f88379', '#9FE2BF', '#89cff0'],
      hint: null
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
      this.hint = null;
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
    getHint() {
      let validMoves = this.getValidMoves();
      console.log("this.player: " + this.player);
      console.log("this.otherPlayer: " + this.otherPlayer);
      let message = [validMoves, toRaw(this.game), this.player, this.otherPlayer, 5];
      worker.postMessage(message);
      this.isLoading = true;
      worker.onmessage = (e) => {
        this.hint = e.data;
        this.isLoading = false;
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
      this.hint = null;
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
      if (this.redPlayer) {
      return 2;
      } else {
        return 1;
      }
    },
    playerDepth() {
      if (this.redPlayer) {
        return this.playerOneLevel;
      } else {
        return this.playerTwoLevel;
      }
    },
    otherPlayerDepth() {
      if (this.redPlayer) {
        return Number(this.playerTwoLevel);
      } else {
        return Number(this.playerOneLevel);
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
      if (!this.gameStarted) {
        return true;
      }
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
