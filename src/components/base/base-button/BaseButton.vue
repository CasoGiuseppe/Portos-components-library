<template>
    
  <button :class="computedClasses" @handleClick="handleClick" :disabled="props.config.disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['click'])
const props = defineProps({
  config: {
    type: Object,
    required: true,
  }
})

const computedClasses = {
  'primary': !props.config.type,
  'medium': !props.config.size,
  'disabled': !!props.config.disabled,
  [props.config.type || '']: !!props.config.type,
  [props.config.size || '']: !!props.config.size,
}

const handleClick = () => {
  emits('click')
}

</script>

<style scoped src="./BaseButton.scss"></style>