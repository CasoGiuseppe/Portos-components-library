<template>
  <section class="slider-show" :id="id">
    <div class="slider-show--container" ref="container">
      <!-- @Slot for slider show content (slides)-->
      <slot name="content" />
    </div>

    <div v-if="arrows">
      <button @click="prevSlide" class="slider-show--arrow">◀</button>
      <button @click="nextSlide" class="slider-show--arrow">▶</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { type ISlideShowComponent } from './types'

const { id, arrows }: ISlideShowComponent = defineProps({
  /**
   * Set the unique id of the default loading message
   */
  id: {
    type: String as PropType<string>,
    default: 'slideShow'
  },
  /**
   * Set if slider has to show arrows
   */
  arrows: {
    type: Boolean as PropType<boolean>,
    default: true
  }
})

const container = ref(null)
const slideWidth = 100 // Ancho de cada slide en píxeles
let currentIndex = 0

const nextSlide = () => {
  const containerWidth = container.value.offsetWidth
  const maxIndex = Math.ceil(container.value.scrollWidth / containerWidth) - 1
  if (currentIndex < maxIndex) {
    currentIndex++
    container.value.style.transform = `translateX(-${currentIndex * slideWidth}px)`
  }
}

const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--
    container.value.style.transform = `translateX(-${currentIndex * slideWidth}px)`
  }
}
</script>

<style lang="scss">
.slider-show {
  position: relative;
  width: 100%;
  overflow: hidden;

  &--container {
    display: flex;
    transition: transform 0.3s ease;
  }

  slide {
    border: 1px solid grey;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    flex-shrink: 0;
    width: 100px; /* Ancho de cada slide */
  }

  &--arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  &--arrow:first-child {
    left: 0;
  }

  &--arrow:last-child {
    right: 0;
  }
}
</style>
