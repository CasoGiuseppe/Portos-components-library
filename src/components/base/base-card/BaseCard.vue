<template>
  <article :class="[
    'base-card',
    `base-card--is-${status}`,
    `base-card--is-${spacing}`
  ]">
    <template v-if="!hasBodySlot">
      <aside class="base-card--has-loader">
        <!-- @slot Slot component loader state -->
        <slot name="loader">
          ...loading
        </slot>
      </aside>
    </template>
    <template v-else>
      <header
        v-if="hasTitleSlot"
        class="base-card__header"
      >
        <h2 class="base-card__title">
          <!-- @slot Title: Set card title -->
          <slot name="title"></slot>

          <span class="base-card__tag">
            <!-- @slot Tag: Set card tag -->
            <slot name="tag"></slot>
          </span>
        </h2>
      </header>
      <section
        v-if="hasBodySlot"
        class="base-card__body"
      >
        <!-- @slot Text: Set card text -->
        <slot name="body"></slot>
      </section>
      <footer
        v-if="hasFooterSlot"
        class="base-card__link"
      >
        <!-- @slot Link: Set card link -->
        <slot name="footer"></slot>
      </footer>
    </template>
  </article>
</template>

<script setup lang="ts">
import { useSlots, type PropType } from 'vue'
import { type UniqueId, Status, Spacing } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'

const { title, body, footer } = useSlots()

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
    default: Status.DEFAULT,
    validator: (prop: Status) => validateValueCollectionExists({ collection: Status, value: prop })
  },
  /**
   * Set the card spacing [none, m, l]
   */
  spacing: {
    type: String as PropType<Spacing>,
    default: Spacing.L,
    validator: (prop: Spacing) => validateValueCollectionExists({ collection: Spacing, value: prop })
  }
})

const hasTitleSlot = !!title
const hasBodySlot = !!body
const hasFooterSlot = !!footer
</script>

<style lang="scss" src="./BaseCard.scss" />
