<template>
  <div class="connect-four">
    <div @click="playerMove(colIndex)" v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" :class="['column', {'r': redPlayer}]">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" class="circle" 
      :class="{red: board[colIndex][rowIndex] == 1, yellow: board[colIndex][rowIndex] == 2}"/>
    </div>
  </div>
  <div>
</div>
<div class="loader-wrapper">
<div class="throbber-loader"></div>
</div>
  <div ref="agent" py-click="from_main"/>
  <div v-for="col, colIndex in game" v-bind:key="colIndex" type="text">
    <input style="display: none" :id="getId(colIndex, rowIndex)" v-for="row, rowIndex in game[colIndex]" v-bind:key="rowIndex" v-model="this.game[colIndex][rowIndex]"/>
  </div>
  <div id="c0" @click="makeMove(0)"/>
  <div id="c1" @click="makeMove(1)"/>
  <div id="c2" @click="makeMove(2)"/>
  <div id="c3" @click="makeMove(3)"/>
  <div id="c4" @click="makeMove(4)"/>
  <div id="c5" @click="makeMove(5)"/>
  <div id="c6" @click="makeMove(6)"/>
</template>

<script type="pyodide">
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
      redPlayer: true
    }
  },
  methods: {
    makeMove(colIndex) {
      this.placeTile(colIndex)
      this.redPlayer = !this.redPlayer;
    },
    playerMove(colIndex) {
      this.makeMove(colIndex);
      this.startWorker();
    },
    startWorker() {
      // TODO: Finish
      this.$refs.agent.click();
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
.r:hover {
  outline-color: rgb(253, 29, 29);
  cursor: pointer;
}
.loader-wrapper {
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
