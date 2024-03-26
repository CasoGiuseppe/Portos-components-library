<template>
  <span :class="['base-tag', `base-tag--is-${status || Types.Default}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import { Types, type UniqueId } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'

defineProps({
  /**
   * Set the unique id of the ui tag
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'TagId'
  },
  /**
   * Set the tag type family [default, warning, damage]
   */
  status: {
    type: String as PropType<Types>,
    default: Types.Default,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  }
})
</script>

<style src="./BaseTag.scss" lang="scss"></style>
