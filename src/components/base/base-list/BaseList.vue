<template>
  <ul class="base-list">
    <li
      :class="[
        'base-list--item',
        `${item.selected ? 'base-list--item-selected' : ''}`,
        `${item.disabled ? 'base-list--item-disabled' : ''}`,
        `${item.icon ? `base-list--item-${item.icon.position}` : ''}`
      ]"
      v-for="item in items"
      :key="item.id"
    >
      <div v-if="item.icon">
        <BaseIcon
          :name="item.icon.name"
          :type="item.icon.type"
          :disabled="item.disabled"
        ></BaseIcon>
      </div>
      <div class="base-list--item-label">
        <div class="base-list--item-label_item" :class="{ disabled: item.disabled }">
          <slot :property="item.label" name="label"></slot>
        </div>
        <div class="base-list--item-label_subitem" :class="{ disabled: item.disabled }">
          <slot :property="item.secondLabel" name="secondLabel"></slot>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import type { IListComponent } from '@ui/base/base-list/models/BaseList'

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
