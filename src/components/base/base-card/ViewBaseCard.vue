<template>
  <div id="app">
    <BaseCard>
      <template #title>
        Este es el título
        <IconArrowCircleDown />
      </template>
      <template #body>
        <p>Este es el contenido del texto de la tarjeta.</p>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import IconArrowCircleDown from '../../icons/IconArrowCircleDown.vue'
</script>

<style lang="scss"></style>
