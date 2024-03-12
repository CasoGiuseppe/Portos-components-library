<template>
  <div class="wrapper">
    <div class="block">
      <BaseButtonV2>Primary L</BaseButtonV2>
      <BaseButtonV2 :size="Sizes.M">Primary M</BaseButtonV2>
      <BaseButtonV2 :size="Sizes.S">Primary S</BaseButtonV2>
      <BaseButtonV2 disabled>Primary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 :variant="Variants.ALT">Primary Alt L</BaseButtonV2>
      <BaseButtonV2 :size="Sizes.M" :variant="Variants.ALT">Primary Alt M</BaseButtonV2>
      <BaseButtonV2 :size="Sizes.S" :variant="Variants.ALT">Primary Alt S</BaseButtonV2>
      <BaseButtonV2 disabled :variant="Variants.ALT">Primary Disabled</BaseButtonV2>
    </div>
    <div class="block">
      <BaseButtonV2 :type="Types.SECONDARY">Secondary L</BaseButtonV2>
      <BaseButtonV2 :type="Types.SECONDARY" :size="Sizes.M">Secondary M</BaseButtonV2>
      <BaseButtonV2 :type="Types.SECONDARY" :size="Sizes.S">Secondary S</BaseButtonV2>
      <BaseButtonV2 disabled>Secondary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 :type="Types.SECONDARY" :variant="Variants.ALT">Secondary Alt L</BaseButtonV2>
      <BaseButtonV2 :type="Types.SECONDARY" :size="Sizes.M" :variant="Variants.ALT">Secondary Alt M</BaseButtonV2>
      <BaseButtonV2 :type="Types.SECONDARY" :size="Sizes.S" :variant="Variants.ALT">Secondary Alt S</BaseButtonV2>
      <BaseButtonV2 disabled :variant="Variants.ALT">Secondary Disabled</BaseButtonV2>
    </div>
    <div class="block">
      <BaseButtonV2 :type="Types.TERTIARY">Tertiary L</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" :size="Sizes.M">Tertiary M</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" :size="Sizes.S">Tertiary S</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" disabled>Tertiary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 :type="Types.TERTIARY" :variant="Variants.ALT">Tertiary Alt L</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" :size="Sizes.M" :variant="Variants.ALT">Tertiary Alt M</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" :size="Sizes.S" :variant="Variants.ALT">Tertiary Alt S</BaseButtonV2>
      <BaseButtonV2 :type="Types.TERTIARY" disabled :variant="Variants.ALT">Tertiary Disabled</BaseButtonV2>
    </div>
    <div>
      <BaseButton :config="{
        'a': 'a',
        'b': 'b',
        'c': 'c',
      }"></BaseButton>
    </div>
    <div v-for="configList in list" :key="configList.id" class="wrapper_item"
      :class="[configList.alt ? 'button_list__alt' : '']">
      <BaseButton v-for="config in configList.values" :key="config.id" :config="config" @click="handleClick">
        {{ config.type }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue';
import BaseButtonV2 from './BaseButtonV2.vue';
import buttons from './BaseButtons.json'
import type { ButtonsListElement } from './interfaces';
import { Types, Sizes, Variants } from './types';
const list = ref<ButtonsListElement[]>(buttons.buttonsList); //type any only to show the list: ButtonsListElement
const handleClick = () => {
  console.log('Button clicked!')
}
</script>
<style scoped lang="scss">
.wrapper {
  border: 1px solid #00204E;
  border-radius: 10px;
  padding: 20px;
}

.wrapper_item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;

  button {
    margin: 2px 0;
  }
}

.block {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;

  &--is-dark {
    background: var(--color-primary-50, #000);
  }
}


.button_list {

  &__alt {
    padding: 20px;
    background-color: #00204E;

  }

  &__alt:last-child {
    border-radius: 0 0 10px 10px;
  }

}
</style>./models./interfaces