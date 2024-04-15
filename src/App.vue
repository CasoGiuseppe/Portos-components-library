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
				class="base-dropdown__button-placeholder"
			/>
    </template>

    <template #list>
      <BaseList
        :list="list"
        :mode="Mode.DROPDOWN"
        :current="selectedOption?.label"
        :visible-options="4"
        @send="selectOption"
      >
        <template #icon="{ icon }">
          <BaseIcon
            :type="icon?.props.type"
            :name="icon?.props.name"
          />
        </template>
        <template #row="{ label }">
          {{ label }}
      </template>
      </BaseList>
    </template>
    
    <template #footer="{ error }">
      <BaseIcon
        name="IconFeedbackError"
        :size="Sizes.XS"
        :type="Types.FEEDBACK"
      />
      <p v-text="error" />
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseDropdown from '@/components/base/base-dropdown/BaseDropdown.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import BaseList from '@/components/base/base-list/BaseList.vue';
import { Sizes, Types } from '@/components/base/base-icon/types';
import { Mode, type IList, type ISelectedOption } from '@/components/base/base-list/types';

const selectedOption = ref<ISelectedOption>();

const selectOption = (option: ISelectedOption) => {
  selectedOption.value = option;
};

const list: IList[] = [
  {
    id: '1',
    label: 'Option 1',
    icon: {
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
    icon: {
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
    icon: {
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
    icon: {
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
    icon: {
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
    icon: {
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