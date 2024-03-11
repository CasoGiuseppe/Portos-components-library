<template>
  <div class="wrapper">
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