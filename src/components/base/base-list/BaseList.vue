<template>
  <ul class="base-list">
    <li
        v-for="(option, index) in options"
        :key="option.label"
        :data-selected="selectedOption?.label === option.label"
        :ref="index === activeIndex ? 'activeOption' : ''"
        @click="selectOption(option)"
        @keyup.enter="selectOption(option)"
        @keydown.prevent="handleKeydown"
        class="base-list--option"
        tabindex="0"
      >
        <BaseIcon
            :name="option.icon.name"
            :type="option.icon.type"
        />
        <p v-text="option.label" />
        <i class="base-list--option-check" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

import type { IBaseListComponent, IListOption } from './types';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';

const customEmits = defineEmits(['select']);
const selectedOption = ref<IListOption>();

const { options } = withDefaults(defineProps<IBaseListComponent>(), {
  options: () => ([])
});

const activeIndex = ref<number>(-1);
const activeOption = ref<HTMLCollectionOf<HTMLElement>>();

const focusActiveOption = () => {
  nextTick(() => {
    activeOption?.value?.[0].focus();
  }); 
};

const selectOption = (option: IListOption) => {
  selectedOption.value = option;
  customEmits('select', selectedOption);
};

const handleKeydown = (event: KeyboardEvent) => {
  const eventTypes: { [key: string]: () => void } = {
    ArrowDown: handleArrowDown,
    ArrowUp: handleArrowUp,
    Tab: handleArrowDown
  };

  const keydownCallback = eventTypes[event.code];

  if (keydownCallback) {
    keydownCallback();
    focusActiveOption();
  }
};

const handleArrowUp = () => {
  activeIndex.value > 0
    ? (activeIndex.value--)
    : (activeIndex.value = options.length - 1);
};

const handleArrowDown = () => {
  if (activeIndex.value < 0) {
    activeIndex.value = 0;
  }

  activeIndex.value < options.length - 1
    ? (activeIndex.value++)
    : (activeIndex.value = 0);
};
</script>

<style src="./BaseList.scss" lang="scss"></style>