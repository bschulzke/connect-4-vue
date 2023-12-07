<template>
    <div class="dropdown-wrapper">
        <div @click="$emit('color-picker')" class="p1-circle small-tile"/>
        <select :disabled="optionsDisabled" @change="handleInput($event)">
            <option>Human</option>
            <option>AI</option>
        </select>
    </div>
</template>

<script>

export default {
  name: 'PlayerSelector',
  prop: ['value'],
  props: {
    optionsDisabled: Boolean,
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value);
    }
  }
}

</script>
