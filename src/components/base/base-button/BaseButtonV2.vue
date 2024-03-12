<template>
  <button
    :class="[
      'base-button',
      `base-button--is-${type}`,
      `base-button--is-${size}`,
      `${variant ? `base-button--is-${type}-${variant}` : ''}`
    ]"
    :disabled="disabled"
    :title="label"
    :aria-disabled="disabled"
    :aria-label="label"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
export interface IBaseButton {
  type?: string,
  variant?: string | undefined,
  size?: string,
  disabled?: boolean,
  label?: string
}

const emits = defineEmits(['click'])


withDefaults(defineProps<IBaseButton>(), {
  type: 'primary',
  variant: undefined,
  size:'L',
  disabled: false,
  label: 'base button'
})


const handleClick = () => {
  emits('click')
}

</script>

<style src="./BaseButtonV2.scss"></style>