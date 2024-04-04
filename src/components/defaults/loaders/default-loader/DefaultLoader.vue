<template>
  <aside :id="id" class="default-loader">
    <Suspense>
      <BaseIcon name="IconCalendarAlarm" :type="Types.CALENDAR" :size="Sizes.M" />
    </Suspense>
    <!-- @slot Default slot laoding message -->
    <slot>wait a moment please...</slot>
  </aside>
</template>
<script setup lang="ts">
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { Sizes, Types } from '@/components/base/base-icon/types'
import { type PropType } from 'vue'

const { id } = defineProps({
  /**
   * Set the unique id of the default loading message
   */
  id: {
    type: String as PropType<string>,
    default: 'loaderID'
  }
})
</script>
<style lang="scss" src="./DefaultLoader.scss" scoped />
