<template>
  <section class="slider-show" :id="id" ref="observer">
    <div class="slider-show--container" ref="container">
      <!-- @Slot for slider show content (slides)-->
      <slot name="content" />
    </div>

    <div v-if="showArrows">
      <button @click="prevSlide" class="slider-show--arrow">
        <Suspense>
          <!-- @slot for left slider arrow-->
          <slot name="leftArrow"></slot>
        </Suspense>
      </button>
      <button @click="nextSlide" class="slider-show--arrow">
        <!-- @slot for right slider arrow-->
        <slot name="rightArrow"></slot>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, type PropType } from 'vue'
import { type ISlideShowComponent } from './types'
import useResizeObserver from '@/shared/composables/useResizeObserver'

const { id, arrows, width }: ISlideShowComponent = defineProps({
  id: {
    type: String as PropType<string>,
    default: 'slideShow'
  },
  arrows: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  width: {
    type: Number as PropType<number>,
    default: 80
  }
})

const observer = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const showArrows = arrows
const slideWidth = width
let currentIndex = 0

onMounted(() => {
  const { createObserver } = useResizeObserver({
    action: ({ width }) => {
      const containerWidth = width
      const maxIndex = Math.ceil(container.value!.scrollWidth / containerWidth) - 1
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex
        container.value!.style.transform = `translateX(-${currentIndex * slideWidth}px)`
      }
    }
  })

  if (observer.value) {
    createObserver({
      trigger: observer.value
    })
  }
})

const nextSlide = () => {
  const containerWidth = observer.value!.clientWidth
  const maxIndex = Math.ceil((container.value!.scrollWidth - containerWidth) / slideWidth)
  if (currentIndex < maxIndex) {
    currentIndex++
    container.value!.style.transform = `translateX(-${currentIndex * slideWidth}px)`
  }
}

const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--
    container.value!.style.transform = `translateX(-${currentIndex * slideWidth}px)`
  }
}

//TODO: calcular nextClick solo para el width del siguiente item
//TODO: mostrar ocultar los iconos
//TODO: añadir iconos base icon (por slot)
</script>

<style lang="scss">
.slider-show {
  width: 100%;
  position: relative;
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
