<template>
  <div class="connect-four">
    <div v-for="col, colIndex in game" v-bind:key="colIndex" id="col-0" class="column">
      <div v-for="row, rowIndex in col" v-bind:key="rowIndex" class="circle" 
      :class="{red: game[rowIndex][colIndex] == 1, yellow: game[rowIndex][colIndex] == 2}"/>
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
        [0,0,0,0,0,0]
      ]
    }
  },
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
  border: 2px solid white;
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
.yellow-select {
  border-color: rgb(255, 255, 121);
}
.red-select {
  border-color: rgb(253, 29, 29);
}
</style>
