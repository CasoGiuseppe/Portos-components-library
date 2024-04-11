<template>
    <section></section>
    <BaseList
      :options="options"
      @select="selectOption"
    />
</template>

<script setup lang="ts">
import BaseList from '@/components/base/base-list/BaseList.vue';
import { Types } from './components/base/base-icon/types';
import { type IListOption } from '@/components/base/base-list/types';

const selectOption = (option: IListOption) => {
  console.log(option);
}

const options: IListOption[] = [
  {
    label: 'Option 1',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  },
  {
    label: 'Option 2',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  },
  {
    label: 'Option 3',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  },
  {
    label: 'Option 4',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  },
  {
    label: 'Option 5',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  },
  {
    label: 'Option 6',
    icon: {
      name: 'IconPlaceholderBase',
      type: Types.PLACEHOLDER
    }
  }
];
</script>
