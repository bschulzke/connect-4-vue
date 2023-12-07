<template>
    <div @click.prevent.stop class="color-picker">
        <font-awesome-icon @click="$emit('close')" icon="fa-solid fa-x"/>
        <div 
        v-for="color in colorOptions" 
        v-bind:key="color" 
        :class="['big-tile', {'green-border': color == playerColor}]" 
        :style="{ 'background-color': color }"
        @click="$emit('color', color)"
        />
    </div>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'ColorPicker',
  components: {
    FontAwesomeIcon
  },
  props: {
        colorOptions: Array,
        playerColor: String
    }
}

</script>
