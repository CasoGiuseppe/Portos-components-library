<template>
  <section style="width: 70vw; padding: 10px; background: #ccc">
    <Slider :body="body">
      <template #item="{ property: { label, id } }">
        <div style="padding: 1rem">{{ label }}{{ id }}</div>
      </template>
    </Slider>
  </section>
</template>

<script setup lang="ts">
import Slider from '@ui/slider/SliderShow.vue'
import { reactive } from 'vue'
const body = reactive([
  {
    id: 1,
    label: 'This is a Label'
  },
  {
    id: 2,
    label: 'This is a Label'
  },
  {
    id: 3,
    label: 'This is a Label'
  },
  {
    id: 4,
    label: 'This is a Label'
  },
  {
    id: 5,
    label: 'This is a Label'
  }
])
</script>
