<template>
  <div :class="['base-card', `base-card--is-${status}`, `base-card--is-${type}`]">
    <div v-if="isLoading" class="loader">
      <DefaultLoader id="loader-card">
        <template #default>Loading...</template>
      </DefaultLoader>
    </div>
    <article v-else :class="{ 'fade-in': !isLoading }">
      <header class="base-card__header" v-if="hasTitleSlot">
        <div class="base-card__title">
          <!-- @slot Title: Set card title -->
          <slot name="title"></slot>
        </div>
        <div class="base-card__tag" v-if="hasTagSlot">
          <!-- @slot Tag: Set card tag -->
          <slot name="tag"></slot>
        </div>
      </header>
      <div class="base-card__body" v-if="hasBodySlot">
        <!-- @slot Text: Set card text -->
        <slot name="body"></slot>
      </div>
      <div class="base-card__link" v-if="hasLinkSlot">
        <!-- @slot Link: Set card link -->
        <slot name="link"></slot>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, type PropType } from 'vue'
import { type UniqueId, Status, Types } from './types'
import DefaultLoader from '@/components/defaults/loaders/default-loader/DefaultLoader.vue'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'

const isLoading = ref(true)
const { title, body, link, tag } = useSlots()

defineProps({
  /**
   * Set the unique id of the ui card
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'CardId'
  },
  /**
   * Set the card status [default, warning]
   */
  status: {
    type: String as PropType<Status>,
    default: Status.DEFAULT
  },
  /**
   * Set the card type [none, m, l]
   */
  type: {
    type: String as PropType<Types>,
    default: Types.L,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  }
})

// Simulación de carga de datos
setTimeout(() => {
  isLoading.value = false
}, 500)

const hasTitleSlot = !!title
const hasBodySlot = !!body
const hasLinkSlot = !!link
const hasTagSlot = !!tag
</script>

<style lang="scss" src="./BaseCard.scss" />
