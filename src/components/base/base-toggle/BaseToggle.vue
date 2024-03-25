<template>
  <button
    data-testID="ui-toggle"
    :id="id"
    :class="[
      'base-toggle',
      `base-toggle--is-${type}`,
      `base-toggle--is-${size}`,
      `${marked ? `base-toggle--is-${type}-ALT` : ''}`,
      `${focus ? `base-toggle--is-${type}-FOC` : ''}`
    ]"
    :disabled="disabled"
    :title="label"
    :aria-disabled="disabled"
    :aria-label="label"
    @click="handleClick"
  >
    <!-- Toggle ball -->
    <div class="toggle-ball"></div>
    
    <!-- Label -->
    <label class="toggle-label">{{ label }}</label>
  
  </button>
</template>

<script setup lang="ts">
import { defineEmits, type PropType } from 'vue'
import { type UniqueId, Sizes, Types } from './types';
import useValidations from '@/components/validation/useValidation';

defineProps({
  /**
   * Set the unique id of the ui toggle
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'toggleId'
  },
  /**
   * Set the toggle type family [primary, secondary, tertiary]
   */
  type: {
    type: String as PropType<Types>,
    default: Types.PRIMARY,
    validator: (prop: Types) => useValidations().validateValueCollectionExists({ collection: Types, value: prop})
  },
  /**
   * Set marked type state
   */
  marked: {
    type: Boolean as PropType<boolean>,
    default: false
  },
   /**
   * Set focus type state
   */
   focus: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the toggle size mode [L, M, S]
   */
  size: {
    type: String as PropType<Sizes>,
    default:Sizes.M,
    validator: (prop: Sizes) => useValidations().validateValueCollectionExists({ collection: Sizes, value: prop})
  },
  /**
   * Set the disabled toggle state
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the aria accesibility label
   */
  label: {
    type: String as PropType<string>
  }
});
const emits = defineEmits(['submit'])
const handleClick = () => emits('submit')

</script>

<style src="./BaseToggle.scss" lang="scss"></style>
