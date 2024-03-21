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
    secondLabel: 'selected',
    icon: {
      left: { type: Types.ARROW, name: 'IconArrowCircleUp' },
      right: { type: Types.ARROW, name: 'IconArrowCircleUp' }
    },
    selected: true
  },
  {
    id: 2,
    label: 'Label',
    secondLabel: 'icon left',
    icon: {
      left: { type: Types.ARROW, name: 'IconArrowCircleUp' }
    },
    selected: false
  },
  {
    id: 3,
    label: 'Label',
    secondLabel: 'icon right',
    icon: {
      right: { type: Types.ARROW, name: 'IconArrowCircleUp' }
    },
    selected: false
  },
  { id: 4, label: 'Label', secondLabel: 'disabled', selected: false, disabled: true },
  {
    id: 5,
    label: 'Label',
    secondLabel: 'disabled && selected',
    icon: {
      left: { type: Types.ARROW, name: 'IconArrowCircleUp' },
      right: { type: Types.ARROW, name: 'IconArrowCircleUp' }
    },
    selected: true,
    disabled: true
  }
]
</script>

<style scoped></style>
