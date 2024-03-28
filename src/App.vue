<template>
  <section style="padding: 20px">
    <BaseToggle @checked="xxx">Label</BaseToggle>
  </section>
</template>

<script setup lang="ts">
import BaseToggle from './components/base/base-toggle/BaseToggle.vue';

const xxx = (checked: boolean) => console.log(`state is ${checked}`)
</script>
