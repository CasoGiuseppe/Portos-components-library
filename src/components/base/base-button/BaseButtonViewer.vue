<template>
  <div class="wrapper">
    <div class="block">
      <BaseButtonV2>Primary L</BaseButtonV2>
      <BaseButtonV2 size="M">Primary M</BaseButtonV2>
      <BaseButtonV2 size="S">Primary S</BaseButtonV2>
      <BaseButtonV2 disabled>Primary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 variant="ALT">Primary Alt L</BaseButtonV2>
      <BaseButtonV2 size="M" variant="ALT">Primary Alt M</BaseButtonV2>
      <BaseButtonV2 size="S" variant="ALT">Primary Alt S</BaseButtonV2>
      <BaseButtonV2 disabled variant="ALT">Primary Disabled</BaseButtonV2>
    </div>
    <div class="block">
      <BaseButtonV2 type="secondary">Secondary L</BaseButtonV2>
      <BaseButtonV2 type="secondary" size="M">Secondary M</BaseButtonV2>
      <BaseButtonV2 type="secondary" size="S">Secondary S</BaseButtonV2>
      <BaseButtonV2 disabled>Secondary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 type="secondary" variant="ALT">Secondary Alt L</BaseButtonV2>
      <BaseButtonV2 type="secondary" size="M" variant="ALT">Secondary Alt M</BaseButtonV2>
      <BaseButtonV2 type="secondary" size="S" variant="ALT">Secondary Alt S</BaseButtonV2>
      <BaseButtonV2 disabled variant="ALT">Secondary Disabled</BaseButtonV2>
    </div>
    <div class="block">
      <BaseButtonV2 type="tertiary">Tertiary L</BaseButtonV2>
      <BaseButtonV2 type="tertiary" size="M">Tertiary M</BaseButtonV2>
      <BaseButtonV2 type="tertiary" size="S">Tertiary S</BaseButtonV2>
      <BaseButtonV2 type="tertiary" disabled>Tertiary Disabled</BaseButtonV2>
    </div>
    <div class="block block--is-dark">
      <BaseButtonV2 type="tertiary" variant="ALT">Tertiary Alt L</BaseButtonV2>
      <BaseButtonV2 type="tertiary" size="M" variant="ALT">Tertiary Alt M</BaseButtonV2>
      <BaseButtonV2 type="tertiary" size="S" variant="ALT">Tertiary Alt S</BaseButtonV2>
      <BaseButtonV2 type="tertiary" disabled variant="ALT">Tertiary Disabled</BaseButtonV2>
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