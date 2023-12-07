<template>
    <div class="dropdown-wrapper">
        <div class="p1-circle small-tile"/>
        <select :disabled="optionsDisabled" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
            <option>Human</option>
            <option>AI</option>
        </select>
    </div>
</template>

<script>

export default {
  name: 'PlayerSelector',
  emits: ['update:modelValue'],
  props: {
    optionsDisabled: Boolean,
    modelValue: String
  }
}

</script>
