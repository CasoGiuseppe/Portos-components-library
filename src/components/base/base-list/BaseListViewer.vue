<template>
  <BaseList :items="items"></BaseList>
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
  { id: 2, label: 'label', secondLabel: 'second label here', selected: false },
  { id: 3, label: 'label', secondLabel: 'second label here', selected: false },
  { id: 4, label: 'label', secondLabel: 'second label here', selected: false },
  { id: 5, label: 'label', secondLabel: '', selected: false }
]
</script>

<style scoped></style>
