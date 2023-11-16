<template>
  <div class="connect-four">
    <div @click="makeMove(colIndex)" v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" :class="['column', {'y': !redPlayer}, {'r': redPlayer}]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" class="circle" 
      :class="{red: board[colIndex][rowIndex] == 1, yellow: board[colIndex][rowIndex] == 2}"/>
    </div>
  </div>
  <button py-click="test_pyscript">TEST</button>
  <div v-for="col, colIndex in game" v-bind:key="colIndex" type="text">
    <input :id="getId(colIndex, rowIndex)" v-for="row, rowIndex in game[colIndex]" v-bind:key="rowIndex" v-model="this.game[colIndex][rowIndex]"/>
  </div>
  <div id="c0" @click="makeMove(0)"/>
  <div id="c1" @click="makeMove(1)"/>
  <div id="c2" @click="makeMove(2)"/>
  <div id="c3" @click="makeMove(3)"/>
  <div id="c4" @click="makeMove(4)"/>
  <div id="c5" @click="makeMove(5)"/>
  <div id="c6" @click="makeMove(6)"/>
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
    getId(col, row) {
      return "a" + col + row
    },
    test(index) {
      this.game[index][index] = 1;
    }
  },
  computed: {
    player() {
      if (this.redPlayer) {
        return 1;
      } else {
        return 2;
      }
    },
    board() {
      return this.game;
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
