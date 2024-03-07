<template>
  <button :class="buttonClasses" @click="handleClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  primary: {
    type: Boolean,
    default: false,
  },
  primaryAlt: {
    type: Boolean,
    default: false
  },
  secondary: {
    type: Boolean,
    default: false
  },
  secondaryAlt: {
    type: Boolean,
    default: false
  },
  tertiary: {
    type: Boolean,
    default: false
  },
  tertiaryAlt: {
    type: Boolean,
    default: false
  },
  large: {
    type: Boolean,
    default: false
  },
  medium: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

const buttonClasses = {
  primary: props.primary,
  primaryAlt: props.primaryAlt,
  secondary: props.secondary,
  secondaryAlt: props.secondaryAlt,
  tertiary: props.tertiary,
  tertiaryAlt: props.tertiaryAlt,
  large: props.large,
  medium: props.medium,
  small: props.small,
  disabled: props.disabled,
}

const handleClick = () => {
  console.log('first?')
  emits('click')
}
</script>

<style scoped src="./BaseButton.scss"></style>