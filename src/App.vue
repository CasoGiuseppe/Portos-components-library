<template>
    <section style="padding: 15px;">
      <!-- <BaseList
        :options="options"
        @select="selectOption"
      />  -->

      <input type="text" :value="labelField">
      <BaseList
        :list="list"
        current="option2"
        @send="setValue"
      >
        <template #row="{ property: { label } }">{{ label }}</template>
      </BaseList>
    </section>
</template>

<script setup lang="ts">
import { Types } from './components/base/base-icon/types';
import { type IListOption } from '@/components/base/base-list/types';

import BaseList from '@ui/base/base-list/BaseList.vue';
import { ref } from 'vue';

const labelField = ref<string>()
const list = [
  {
    id: '1',
    label: 'option 1',
    option: 'option1'
  },
  {
    id: '2',
    label: 'option 2',
    option: 'option2'
  },
  {
    id: '3',
    label: 'option 3',
    option: 'option3'
  },
  {
    id: '4',
    label: 'option 4',
    option: 'option4'
  }
]

const setValue = ({ label }: { label: string }): void => { labelField.value = label }



// Alexandro

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
