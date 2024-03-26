<template>
  <div
    :class="[
      'navigation-item-contextual',
      selected ? 'navigation-item-contextual--is-selected' : null
    ]"
    :id="id"
    @click="handleClickItem"
    data-testID="ui-navigation-item-contextual"
  >
    <section class="navigation-item-contextual--content">
      <!-- @ slot for content-->
      <slot name="content" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
interface INavigationItemContextualComponent {
  id: string
  selected: boolean
}

const { id, selected }: INavigationItemContextualComponent = defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<string>,
    default: 'tabId'
  },
  /**
   * v-model value
   */
  selected: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})
// emits
const customEmits = defineEmits(['selected'])

const handleClickItem = () => customEmits('selected', id)
</script>

<style src="./NavigationItemContextual.scss"></style>
