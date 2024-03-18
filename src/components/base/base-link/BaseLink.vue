<template>
  <component
    :is="elementType"
    data-testID="ui-link"
    :id="id"
    :class="[
      'base-link',
      `base-link--is-${type}`,
      `base-link--is-${size}`,
      { [`base-link--is-${type}-ALT`]: variant && !disabled },
      { [`base-link--is-${type}-ALT-disabled`]: variant && disabled },
      { 'base-link--is-disabled': disabled && !variant }
    ]"
    :disabled="disabled"
    :title="label"
    @click="handleClick"
  >
    <!-- @slot Default slot for link label -->
    <slot />
  </component>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { UniqueIdLink, SizesLink, TypesLink, ElementLink } from './types'
import useValidations from '@/components/validation/useValidation'

const props = defineProps({
  /**
   * Set the unique id of the ui link
   */
  id: {
    type: String as PropType<UniqueIdLink>,
    default: 'LinkId'
  },
  /**
   * Set the link type family [primary, secondary, tertiary]
   */
  type: {
    type: String as PropType<TypesLink>,
    default: TypesLink.PRIMARY,
    validator: (prop: TypesLink) =>
      useValidations().validateValueCollectionExists({ collection: TypesLink, value: prop })
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
    type: String as PropType<SizesLink>,
    default: SizesLink.M,
    validator: (prop: SizesLink) =>
      useValidations().validateValueCollectionExists({ collection: SizesLink, value: prop })
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
    type: String as PropType<ElementLink>,
    default: ElementLink.A
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
  if (props.elementType === 'a' && props.href !== '#') {
    if (!props.disabled) {
      window.location.href = props.href
    }
  } else {
    emits('submit')
  }
}
</script>

<style src="./BaseLink.scss" lang="scss"></style>
