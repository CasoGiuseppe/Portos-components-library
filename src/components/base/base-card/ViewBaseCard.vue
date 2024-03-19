<template>
  <div id="app">
    <BaseCard>
      <template #title>
        Este es el título
        <BaseIcon :type="Types.ARROW" :size="Sizes.S"/>
      </template>
      <template #body>
        <p>Este es el contenido del texto de la tarjeta.</p>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '../base-icon/types';

</script>

<style lang="scss"></style>
