<template>
  <button
    :id="id"
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
import { defineEmits, type PropType } from 'vue'
import { type UniqueId, Sizes, Types, Variants } from './types';
import useValidations from '@/components/validation/useValidation';


defineProps({
  id: {
    type: String as PropType<UniqueId>,
    default: 'buttonId'
  },
  type: {
    type: String as PropType<Types>,
    default: Types.PRIMARY,
    validator: (prop: Types) => useValidations().validateValueCollectionExists({ collection: Types, value: prop})
  },
  variant: {
    type: String as PropType<Variants>,
    validator: (prop: Variants) => useValidations().validateValueCollectionExists({ collection: Variants, value: prop})
  },
  size: {
    type: String as PropType<Sizes>,
    default:Sizes.L,
    validator: (prop: Sizes) => useValidations().validateValueCollectionExists({ collection: Sizes, value: prop})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  }
});
const emits = defineEmits(['click'])
const handleClick = () => emits('click')

</script>

<style src="./BaseButton.scss" lang="scss"></style>