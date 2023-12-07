<template>
  <ConnectFour/>
</template>

<script>
import ConnectFour from './components/ConnectFour.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faX } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faX);
library.add(faLightbulb);
library.add(faGithub);

export default {
  name: 'App',
  components: {
    ConnectFour,
    FontAwesomeIcon
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

@media (prefers-color-scheme: dark) { 
  body {
    color: white; 
    background: rgb(19, 19, 19) 
  }
}

</style>
