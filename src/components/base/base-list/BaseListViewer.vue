<template>
  <BaseList :items="items">
    <template #label="{ property }">
      {{ property }}
    </template>
    <template #secondLabel="{ property }">
      {{ property }}
    </template>
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from './BaseList.vue'
import { Types } from '@ui/base/base-icon/types'
import type { IListComponent } from '@ui/base/base-list/models/BaseList'

const items: IListComponent[] = [
  {
    id: 1,
    label: 'label',
    secondLabel: 'second label here',
    icon: { type: Types.ARROW, name: 'IconArrowCircleUp', position: 'left' },
    selected: true
  },
  { id: 2, label: 'Label', secondLabel: 'Second label here', selected: false },
  { id: 3, label: 'Label', secondLabel: 'Second label here', selected: false },
  { id: 4, label: 'Label', secondLabel: 'Second label here', selected: false, disabled: true },
  { id: 5, label: 'Label', secondLabel: 'Second Label disabled', selected: true, disabled: true }
]
</script>

<style scoped></style>
