<template>
  <section class="slider-show" :id="id" ref="observer">
    <div class="slider-show--container" ref="container">
      <!-- @Slot for slider show content (slides)-->
      <slot name="content" />
    </div>

    <template v-if="showArrows">
      <button @click="prevSlide" class="slider-show--arrow" :disabled="!prevArrow">
        <Suspense>
          <!-- @slot for left slider arrow-->
          <slot name="leftArrow"></slot>
        </Suspense>
      </button>
      <button @click="nextSlide" class="slider-show--arrow" :disabled="!nextArrow">
        <!-- @slot for right slider arrow-->
        <slot name="rightArrow"></slot>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, onUnmounted, onUpdated } from 'vue'
import { type ISlideShowComponent } from './types'
import useResizeObserver from '@/shared/composables/useResizeObserver'

const { id, arrows, width }: ISlideShowComponent = defineProps({
  id: {
    type: String,
    default: 'slideShow'
  },
  arrows: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 125
  }
})

const observer = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const observerValues = ref<{ width: number; height: number } | null>(null)
const containerValues = ref<{ width: number; height: number } | null>(null)
const showArrows = arrows
const slideWidth = width
let currentIndex = 0
const nextArrow = ref(true)
const prevArrow = ref(false)

const showResizeData = ({ width, height }: { width: number; height: number }): any => {
  observerValues.value = { width, height }
}
const showContainerResizeData = ({ width, height }: { width: number; height: number }): any => {
  containerValues.value = { width, height }
}
const { createObserver } = useResizeObserver({ action: showResizeData })
const { createObserver: createContainerObserver } = useResizeObserver({
  action: showContainerResizeData
})

onMounted(() => {
  if (observer.value) {
    createObserver({
      trigger: observer.value
    })
  }

  if (container.value) {
    createContainerObserver({
      trigger: container.value
    })
  }
})

onUnmounted(() => {
  observerValues.value = null
  containerValues.value = null
})

const nextSlide = () => {
  if (containerValues.value && observerValues.value) {
    const maxIndex = Math.ceil(
      (container.value!.scrollWidth - containerValues.value.width) / slideWidth
    )
    if (currentIndex < maxIndex) {
      currentIndex++
      container.value!.style.transform = `translateX(-${currentIndex * slideWidth}px)`
      container.value!.style.transition = 'transform 0.4s ease'
      nextArrow.value = true
      prevArrow.value = true
    } else {
      nextArrow.value = false
      prevArrow.value = true
    }
  }
}

const prevSlide = () => {
  if (currentIndex > 0) {
    currentIndex--
    container.value!.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    container.value!.style.transition = 'transform 0.4s ease'
    prevArrow.value = true
    nextArrow.value = true
  } else {
    prevArrow.value = false
    nextArrow.value = true
  }
}
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

@media screen and (max-width: 768px) {
  .slider-show {
    overflow-x: auto;
  }

  .slider-show--arrow {
    display: none;
  }
}
</style>
