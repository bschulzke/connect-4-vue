<template>
  <div style="height: 2rem;">{{ victoryText }}</div>
  <div class="connect-four">
    <div @click="makeMove(colIndex)" v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" :class="['column', {'y': !redPlayer}, {'r': redPlayer}]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" class="circle" 
      :class="{red: game[colIndex][rowIndex] == 1, yellow: game[colIndex][rowIndex] == 2}"/>
    </div>
  </div>
</template>

<script>
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
      redPlayer: true
    }
  },
  methods: {
    makeMove(colIndex) {
      this.placeTile(colIndex)
      this.redPlayer = !this.redPlayer;
    },
    placeTile(colIndex) {
      if (this.game[colIndex][0] == 0) {
        this.game[colIndex][this.getRowIndex(colIndex)] = this.player
      }
    },
    getRowIndex(colIndex) {
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
      if (this.redPlayer) {
        return 1;
      } else {
        return 2;
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
    currentPlayer() {
      if (this.gameOver()) {
        return 0;
      }
      if (this.redPlayer) {
        return 1;
      } else {
        return 2;
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
  gap: 1px;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 1px;
  outline: 2px solid transparent;
  border-radius: 5px;
}
.circle {
  border: 1px solid grey;
  height: 14vh;
  width: 14vh;
  border-radius: 100%;
}
.red {
  background-color: rgb(253, 29, 29);
}
.yellow {
  background-color: rgb(255, 255, 121);
}
.y:hover {
  outline-color: rgb(255, 255, 121);
  cursor: pointer;
}
.r:hover {
  outline-color: rgb(253, 29, 29);
  cursor: pointer;
}
</style>
