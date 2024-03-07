<template>
  <div class="wrapper">
    <div class="wrapper_item button_list">
      <BaseButton primary large @click="handleClick">Primary L</BaseButton>
      <BaseButton primary medium @click="handleClick">Primary M</BaseButton>
      <BaseButton primary small @click="handleClick">Primary S</BaseButton>
    </div>
    <div class="wrapper_item button_list">
      <BaseButton primary large disabled @click="handleClick">Primary L</BaseButton>
      <BaseButton primary medium disabled @click="handleClick">Primary M</BaseButton>
      <BaseButton primary small disabled @click="handleClick">Primary S</BaseButton>
    </div>
    <div class="wrapper_item button_list__alt">
      <BaseButton primaryAlt large @click="handleClick">PrimaryAlt L</BaseButton>
      <BaseButton primaryAlt medium @click="handleClick">PrimaryAlt M</BaseButton>
      <BaseButton primaryAlt small @click="handleClick">PrimaryAlt S</BaseButton>
    </div>
    <div class="wrapper_item button_list">
      <BaseButton secondary large @click="handleClick">secondary L</BaseButton>
      <BaseButton secondary medium @click="handleClick">secondary M</BaseButton>
      <BaseButton secondary small @click="handleClick">secondary S</BaseButton>
    </div>
    <div class="wrapper_item button_list__alt">
      <BaseButton secondaryAlt large @click="handleClick">secondary Alt L</BaseButton>
      <BaseButton secondaryAlt medium @click="handleClick">secondary Alt M</BaseButton>
      <BaseButton secondaryAlt small @click="handleClick">secondary Alt S</BaseButton>
    </div>
    <div class="wrapper_item button_list">
      <BaseButton tertiary large @click="handleClick">tertiary L</BaseButton>
      <BaseButton tertiary medium @click="handleClick">tertiary M</BaseButton>
      <BaseButton tertiary small @click="handleClick">tertiary S</BaseButton>
    </div>
    <div class="wrapper_item button_list__alt">
      <BaseButton tertiaryAlt large @click="handleClick">tertiary Alt L</BaseButton>
      <BaseButton tertiaryAlt medium @click="handleClick">tertiary Alt M</BaseButton>
      <BaseButton tertiaryAlt small @click="handleClick">tertiary Alt S</BaseButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

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

  button {
    margin: 2px 0;
  }
}

.button_list {
  padding: 20px;

  &__alt {
    padding: 20px;
    background-color: #00204E;

  }

  &__alt:last-child {
    border-radius: 0 0 10px 10px;
  }

}
</style>