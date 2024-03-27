<template>
  <component
    :is="elementType"
    :class="[
      'navigation-item-contextual',
      selected ? 'navigation-item-contextual--is-selected' : null
    ]"
    :id="id"
    @click="handleClickItem"
    data-testID="ui-navigation-item-contextual"
  >
    <!-- @slot Default slot for item content -->
    <slot/>
  </component>
</template>

<script setup lang="ts">
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'
import { type PropType } from 'vue'
import { type INavigationItemContextualComponent, Element } from './types'

const { id }: INavigationItemContextualComponent = defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<string>,
    default: 'tabId'
  },
  /**
   * Set the selected tab
   */
  selected: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the element type (button or a)
   */
  elementType: {
    type: String as PropType<Element>,
    default: Element.BUTTON,
    validator: (prop: Element) =>
      validateValueCollectionExists({ collection: Element, value: prop })
  }
})
// emits
const customEmits = defineEmits(['send'])
const handleClickItem = () => customEmits('send', id)
</script>

<style src="./NavigationItemContextual.scss"></style>
