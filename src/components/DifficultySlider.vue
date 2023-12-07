<template>
    <div class="slider-wrapper">
      <input :disabled="optionsDisabled" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="range" id="al" name="a1" min="0" max="5">    
      <label disabled="true" for="a1">Difficulty</label>
    </div>
</template>

<script>

export default {
    name: 'DifficultySlider',
    props: ['modelValue', 'optionsDisabled'],
    emits: ['update:modelValue']
}

</script>
