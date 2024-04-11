<template>
  <section style="width: 50vw; padding: 10px; background: #ccc;">
    <Slider :body="body">
      <template #item="{ property: { label, id } }">
        <div>{{ label }}{{ id }}</div>
      </template>
    </Slider>
  </section>
</template>

<script setup lang="ts">
import Slider from "@ui/slider/Slider.vue"
import { reactive } from "vue";
const body = reactive([{
  id: 1,
  label: 'soy un label',
  className: 'small',
},{
  id: 2,
  label: 'soy un label',
  className: 'big'
},{
  id: 3,
  label: 'soy un label',
  className: 'big'
},{
  id: 4,
  label: 'soy un label',
  className: 'small'
},{
  id: 5,
  label: 'soy un label',
  className: 'medium'
}])
</script>
