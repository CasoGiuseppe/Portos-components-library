<template>
  <section style="padding: 10px; background: #ccc">
    <Slider :items="sliderItems">
      <!-- <template v-for="item in sliderItems" v-slot:[`item-${item.id}`] :key="item.id">
        <NavigationItemContextual :id="item.id" :selected="item.selected">
          {{ item.label }}
        </NavigationItemContextual>
      </template>
       <NavigationItemContextual>tes 2 2 2 2ta sdf sdf sdf</NavigationItemContextual> -->
    </Slider>
  </section>
</template>

<script setup lang="ts">
import Slider from '@ui/slider/Slider.vue'
import NavigationItemContextual from './components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

const sliderItems = [
  { id: '1', selected: false, label: 'test 1' },
  { id: '2', selected: false, label: 'test 11' },
  { id: '3', selected: false, label: 'test 111' },
  { id: '4', selected: false, label: 'test 1111' },
  { id: '5', selected: false, label: 'test 11111' }
]
</script>
