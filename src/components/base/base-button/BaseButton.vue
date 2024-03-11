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
  ...props.config.type && { [props.config.type]: true },
  ...props.config.size && { [props.config.size]: true },
}

const handleClick = () => {
  emits('click')
}

</script>

<style scoped src="./BaseButton.scss"></style>