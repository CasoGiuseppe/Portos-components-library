<template>
  <section
    :class="[
      'base-button',
      `${fullSize ? `base-button--is-fullSize` : ''}`
    ]">
    <button
      data-testID="ui-button"
      :id="id"
      :class="[
        'base-button__element',
        `base-button--is-${type}`,
        `base-button--is-${size}`,
        `${variant ? `base-button--is-${type}-ALT` : ''}`,
      ]"
      :disabled="disabled"
      :data-invalid="hasSlotContent(slots?.error)"
      :data-active="active"
      :title="label"
      :aria-disabled="disabled"
      :aria-invalid="disabled"
      :aria-label="label"
      @click="handleClick"
    >
      <p class="base-button__label">
        <!-- @slot Default slot for button label -->
        <slot />
      </p>
    </button>

    <p
      v-if="slots.error"
      class="base-button__footer"
    >
      <!-- @slot Error slot to show user message -->
      <slot name="error" />
    </p>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, useSlots, type PropType, type Slot } from 'vue'
import { type UniqueId, Sizes, Types } from './types';
import { validateValueCollectionExists } from '@ui/utilities/validation/useValidation';
import { isVnodeEmpty } from '@/shared/helpers';

const slots = useSlots();
const hasSlotContent = (slot: Slot<any> | undefined) => {
  if (!slot) return false
  return !isVnodeEmpty(slot())
}

defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'buttonId'
  },
  /**
   * Set the button type family [primary, secondary, tertiary, backToTop]
   */
  type: {
    type: String as PropType<Types>,
    default: Types.PRIMARY,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop})
  },
  /**
   * Set variant type state
   */
  variant: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the button size mode [L, M, S]
   */
  size: {
    type: String as PropType<Sizes>,
    default:Sizes.L,
    validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
  },
  /**
   * Set the disabled button state
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the aria accesibility label
   */
  label: {
    type: String as PropType<string>,
    default: 'component label'
  },
  /**
   * Set the active button state
   */
  active: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  /**
   * Set fullsize 100% width
   */
   fullSize: {
    type: Boolean as PropType<boolean>,
    default: false
  },
});

const emits = defineEmits(['send']);

const handleClick = () => emits('send');

</script>

<style src="./BaseButton.scss" lang="scss"></style>