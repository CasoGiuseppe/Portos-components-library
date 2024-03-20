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
    :disabled="disabled"
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
import { PropType } from 'vue'
import { UniqueId, Sizes, Types, Element } from './types'
import useValidations from '@/components/validation/useValidation'

const props = defineProps({
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
    validator: (prop: Types) =>
      useValidations().validateValueCollectionExists({ collection: Types, value: prop })
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
    validator: (prop: Sizes) =>
      useValidations().validateValueCollectionExists({ collection: Sizes, value: prop })
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
  },
  /**
   * Set the href attribute for anchor element
   */
  href: {
    type: String as PropType<string>,
    default: '#'
  }
})
const emits = defineEmits(['submit'])
const handleClick = () => {
  const { disabled, elementType, href } = props
  if (disabled) return
  elementType === Element.ANCHOR && href !== '#' ? (window.location.href = href) : emits('submit')
}
</script>

<style src="./BaseLink.scss" lang="scss"></style>
