<template>
  <BaseDropdown
    :selected-option="selectedOption"
  >
    <template #header>
      <label>Label</label>
      <BaseIcon
        name="IconFeedbackAnswer"
        :type="Types.FEEDBACK"
      />
    </template>

    <template #placeholder="{ placeholder }">
      <p
				v-text="selectedOption?.label || placeholder"
				:data-checked="!!selectedOption"
				class="base-dropdown__placeholder"
			/>
    </template>

    <template #list>
      <BaseList
        :list="list"
        :mode="Mode.DROPDOWN"
        :current="selectedOption?.option"
        :visible-options="5"
        @send="selectOption"
      >
        <template #row="{ label }">{{ label }}</template>
        <template #component="{ component }">
          <Component
            v-if="component"
            :is="component.type"
            v-bind="component.props"
          />
        </template>
      </BaseList>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseDropdown from '@/components/base/base-dropdown/BaseDropdown.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import BaseList from '@/components/base/base-list/BaseList.vue';
import { Types } from '@/components/base/base-icon/types';
import { Mode, type IList, type ISelected } from '@/components/base/base-list/types';

const selectedOption = ref<ISelected>();

const selectOption = (option: ISelected) => {
  selectedOption.value = option;
};

const list: IList[] = [
  {
    id: '1',
    label: 'Option 1',
    component: {
      type: BaseIcon,
      props: {
        type: Types.PLACEHOLDER,
        name: 'IconPlaceholderBase',
      }
    },
    option: '1'
  },
  {
    id: '2',
    label: 'Option 2',
    component: {
      type: BaseIcon,
      props: {
        type: Types.ARROW,
        name: 'IconArrowDownMD',
      }
    },
    option: '2'
  },
  {
    id: '3',
    label: 'Option 3',
    component: {
      type: BaseIcon,
      props: {
        type: Types.PLACEHOLDER,
        name: 'IconPlaceholderBase',
      }
    },
    option: '3'
  },
  {
    id: '4',
    label: 'Option 4',
    component: {
      type: BaseIcon,
      props: {
        type: Types.PLACEHOLDER,
        name: 'IconPlaceholderBase',
      }
    },
    option: '4'
  },
  {
    id: '5',
    label: 'Option 5',
    component: {
      type: BaseIcon,
      props: {
        type: Types.PLACEHOLDER,
        name: 'IconPlaceholderBase',
      }
    },
    option: '5'
  },
  {
    id: '6',
    label: 'Option 6',
    component: {
      type: BaseIcon,
      props: {
        type: Types.PLACEHOLDER,
        name: 'IconPlaceholderBase',
      }
    },
    option: '6'
  },
];
</script>