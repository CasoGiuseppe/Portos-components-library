<template>
  <div id="app">
    <BaseCard>
      <template #title>
        Este es el título
        <IconFeedbackInfo />
      </template>
      <template #body>
        <p>Este es el contenido del texto de la tarjeta.</p>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import IconFeedbackInfo from '@ui/icons/feedback/IconFeedbackInfo.vue'
</script>

<style lang="scss"></style>
