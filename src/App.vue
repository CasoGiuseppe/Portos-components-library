<template>
  <BaseDropDown
    placeholder="Select your option (x)"
    label="Label"
  >
    <template #header="{ label }">
      <label
        v-text="label"
        class="base-dropdown--header-label"
      />
      <BaseIcon
        name="IconFeedbackAnswer"
        :type="Types.FEEDBACK"
      />
    </template>

    <template #options="{ selectOption, selectedOption }">
      <li
        v-for="(option, index) in options"
        :key="option.label"
        :class="[
          'base-dropdown--options-item',
          selectedOption === option.label ? 'base-dropdown--options-item-is-selected' : '',
        ]"
        :ref="index === activeIndex ? 'activeOption' : ''"
        @click="selectOption(option)"
        @keyup.enter="selectOption(option)"
        @keydown.arrow-up.prevent="handleArrowUp"
        @keydown.arrow-down.prevent="handleArrowDown"
        @keydown.tab.prevent="handleArrowDown"
        tabindex="0"
      >
        <BaseIcon
          :name="option.icon.name"
          :type="option.icon.type"
        />
        <p v-text="option.label" />
        <i
          v-if="selectedOption === option.label"
          class="base-dropdown--options-item-check"
        />
			</li>
    </template>
    
    <template #footer="{ error }">
      <BaseIcon
        name="IconFeedbackError"
        :size="Sizes.XS"
        :type="Types.FEEDBACK"
      />
      <p v-text="error" />
    </template>
  </BaseDropDown>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

import BaseDropDown from '@/components/base/base-dropdown/BaseDropdown.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from '@/components/base/base-icon/types';
import { type IDropdownOption } from '@/components/base/base-dropdown/types';

const activeIndex = ref<number>(-1);
const activeOption = ref<HTMLCollectionOf<HTMLElement> | null>(null);

const options: IDropdownOption[] = [
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

const focusActiveOption = () => {
  nextTick(() => {
    activeOption?.value?.[0].focus();
  }); 
}

const handleArrowUp = (event: KeyboardEvent) => {
  event.preventDefault();

  activeIndex.value > 0
    ? (activeIndex.value--)
    : (activeIndex.value = options.length - 1);

  focusActiveOption();
};

const handleArrowDown = (event: KeyboardEvent) => {
  event.preventDefault();
  
  if (activeIndex.value < 0) {
    activeIndex.value = 0;
  }

  activeIndex.value < options.length - 1
    ? (activeIndex.value++)
    : (activeIndex.value = 0);

  focusActiveOption();
};
</script>