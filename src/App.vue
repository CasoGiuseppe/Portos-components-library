<template>
  <BaseDropdown
    :selected-option="selectedOption"
    placeholder="Select your option (x)"
  >
    <template #header>
      <label>Label</label>
      <BaseIcon
        name="IconFeedbackAnswer"
        :type="Types.FEEDBACK"
      />
    </template>

    <template #list>
      <BaseList
        :options="options"
        @select="selectOption"
      />
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
import { Sizes, Types } from './components/base/base-icon/types';
import { type IListOption } from '@/components/base/base-list/types';

const selectedOption = ref<IListOption>();

const selectOption = (option: IListOption) => {
  selectedOption.value = option;
};

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