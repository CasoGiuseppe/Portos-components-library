<template>
    <section style="padding: 15px;">
      <!-- <BaseList
        :options="options"
        @select="selectOption"
      />  -->

      <input type="text" :value="labelField">
      <BaseList
        :list="list"
        :mode="Mode.DROPDOWN"
        current="option2"
        @send="setValue"
      >
        <template #row="{ property: { label } }">{{ label }}</template>
        <template #icon="{ property: { icon } } ">
          <component
            v-if="icon"
            :is="icon.type"
            v-bind="icon.props"
          />
        </template>
      </BaseList>
    </section>
</template>

<script setup lang="ts">
import BaseList from '@ui/base/base-list/BaseList.vue';
import BaseIcon from './components/base/base-icon/BaseIcon.vue';

import { Types } from './components/base/base-icon/types';
import { Mode } from '@/components/base/base-list/types';
import { ref } from 'vue';

const labelField = ref<string>()
const list = [
  {
    id: '1',
    label: 'option 1',
    option: 'option1',
    icon: {
      type: BaseIcon,
      props: {
        type: 'arrow',
        name: 'IconArrowCircleRight',
        size: 'M'
      },
    }
  },
  {
    id: '2',
    label: 'option 2',
    option: 'option2',
    icon: {
      type: BaseIcon,
      props: {
        type: 'chevron',
        name: 'IconChevronUpM',
        size: 'M'
      },
    }
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
