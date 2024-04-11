<template>
  <section style="padding: 0px; background: #ccc">
    <div style="display: block">
      <SliderIn :items="sliderItems">
        <template v-for="item in sliderItems" :key="item.id" v-slot:[`item-${item.id}`]>
          <NavigationItemContextual :id="item.id" :selected="item.selected" @send="handleSend">{{
            item.title
          }}</NavigationItemContextual>
        </template>
      </SliderIn>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SliderIn from '@ui/slider/SliderIn.vue'
import NavigationItemContextual from './components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

let sliderItems: any = ref([
  { id: '1', title: 'title small', selected: false },
  { id: '2', title: 'my title is medium', selected: true },
  { id: '3', title: 'this is a big title for testing', selected: false },
  { id: '4', title: 'Noatum', selected: false },
  { id: '5', title: 'PortOs', selected: false },
  { id: '6', title: 'Home', selected: false },
  { id: '7', title: 'Email', selected: false },
  { id: '8', title: 'Please contact us', selected: false }
])

const handleSend = (id: string) => {
  for (let i = 0; i < sliderItems.value.length; i++) {
    if (sliderItems.value[i].id.toString() === id) {
      sliderItems.value[i].selected = true
    } else {
      sliderItems.value[i].selected = false
    }
  }
}
</script>
