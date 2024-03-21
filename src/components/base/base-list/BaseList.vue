<template>
  <input type="text" value="" />
  <ul class="base-list">
    <li
      :class="[
        'base-list--item',
        `${item.selected ? 'base-list--item-selected' : ''}`,
        `${item.disabled ? 'base-list--item-disabled' : ''}`
      ]"
      v-for="item in items"
      :key="item.id"
      @click="selectItem(item)"
    >
      <div v-if="item.icon && item.icon.left" class="base-list--item-left">
        <Suspense>
          <BaseIcon
            :name="item.icon.left.name"
            :type="item.icon.left.type"
            :disabled="item.disabled"
          ></BaseIcon>
        </Suspense>
      </div>
      <div class="base-list--item-center">
        <div class="base-list--item-label">
          <div class="base-list--item-label_item" :class="{ disabled: item.disabled }">
            <slot :property="item.label" name="label"></slot>
          </div>
          <div class="base-list--item-label_subitem" :class="{ disabled: item.disabled }">
            <slot :property="item.secondLabel" name="secondLabel"></slot>
          </div>
        </div>
      </div>
      <div v-if="item.icon && item.icon.right" class="base-list--item-right">
        <Suspense>
          <BaseIcon
            :name="item.icon.right.name"
            :type="item.icon.right.type"
            :disabled="item.disabled"
          ></BaseIcon>
        </Suspense>
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

// emits
const customEmits = defineEmits(['selected'])
const selectItem = (item: IListComponent) => {
  if (!item.disabled) {
    customEmits('selected', item)
  }
}
</script>

<style lang="scss" src="./BaseList.scss"></style>
