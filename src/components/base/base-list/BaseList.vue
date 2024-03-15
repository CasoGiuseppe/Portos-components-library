<template>
  <ul class="base-list">
    <li
      :class="[
        'base-list--item',
        `${item.selected ? 'base-list--item-selected' : ''}`,
        `${item.icon ? `base-list--item-${item.icon.position}` : ''}`
      ]"
      v-for="item in items"
      :key="item.id"
    >
      <div v-if="item.icon">
        <BaseIcon :name="item.icon.name" :type="item.icon.type"></BaseIcon>
      </div>
      <div class="base-list--item-label_wrapper">
        <slot :property="{ item }" name="label"> {{ item.label }} </slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import type { IListComponent } from '@ui/base/base-list/models/BaseList'

/* const props = defineProps<{
  items: IListComponent[]
}>() */

const { items } = withDefaults(
  defineProps<{
    items: IListComponent[]
  }>(),
  {
    items: () => []
  }
)
</script>

<style lang="scss" src="./BaseList.scss"></style>
