<template>
  <div class="connect-four">
    <div id="col-0" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
    <div id="col-1" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
    <div id="col-2" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle red"/>
      <div class="circle yellow"/>
    </div>
    <div id="col-3" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
    <div id="col-4" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
    <div id="col-5" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
    <div id="col-6" class="column">
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
      <div class="circle"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connect Four'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.connect-four {
  display: flex;
  justify-content: center;
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
</style>
