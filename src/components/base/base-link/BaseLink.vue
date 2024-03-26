<template>
  <component
    :is="elementType"
    data-testID="ui-link"
    :id="id"
    :class="[
      'base-link',
      `base-link--is-${type}`,
      `base-link--is-${size}`,
      `${variant ? `base-link--is-${type}-ALT` : ''}`
    ]"
    :disabled="disabled || null"
    :aria-disabled="disabled"
    :aria-label="label"
    :title="label"
    @click="handleClick"
  >
    <!-- @slot Default slot for link label -->
    <slot />
  </component>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type UniqueId, Sizes, Types, Element } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'

const { elementType } = defineProps({
  /**
   * Set the unique id of the ui link
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'LinkId'
  },
  /**
   * Set the link type family [primary, secondary, tertiary]
   */
  type: {
    type: String as PropType<Types>,
    default: Types.PRIMARY,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  },
  /**
   * Set variant type state
   */
  variant: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the link size mode [M, S]
   */
  size: {
    type: String as PropType<Sizes>,
    default: Sizes.M,
    validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop })
  },
  /**
   * Set the disabled link state
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
    default: 'Link'
  },
  /**
   * Set the element type (button or a)
   */
  elementType: {
    type: String as PropType<Element>
  }
})
const emits = defineEmits(['send'])
const handleClick = () => {
  if (elementType === Element.ANCHOR) return
  emits('send')
}
</script>

<style src="./BaseLink.scss" lang="scss"></style>
