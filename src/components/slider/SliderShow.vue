<template>
  <section class="slider-show" :id="id" ref="observer">
    <div class="slider-show--container" ref="container">
      <!-- @Slot for slider show content (slides)-->
      <slot name="content" />
    </div>

    <template v-if="showArrows">
      <button @click="prevSlide" class="slider-show--arrow" :disabled="!prevArrow">
        <!-- @slot for left slider arrow-->
        <slot name="leftArrow"></slot>
      </button>
      <button @click="nextSlide" class="slider-show--arrow" :disabled="!nextArrow">
        <!-- @slot for right slider arrow-->
        <slot name="rightArrow"></slot>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, onUnmounted } from 'vue'
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
const newTranslateX = ref(0)

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
  // function to retrieve the next item not visible
  interface SliderItem {
    id: string
    width: number
  }
  const nextItemNotVisible = (
    totalWidth: number,
    items: SliderItem[],
    translate: number = 0
  ): SliderItem | undefined => {
    let widthSum: number = 0
    let visible = false
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      widthSum += item.width
      if (!visible && widthSum > translate) {
        visible = true
        continue
      }
      if (visible && widthSum > totalWidth + translate) return item
    }
  }

  if (containerValues.value && observerValues.value) {
    const containerChildren = container.value!.children
    const totalItems = containerChildren.length
    const totalItemsValues: SliderItem[] = []

    for (let i = 0; i < totalItems; i++) {
      const childElement = containerChildren[i] as HTMLElement
      const id = childElement.id
      const width = childElement.offsetWidth

      totalItemsValues.push({ id, width })
    }

    console.log(totalItemsValues)

    let totalVisibleWidth = 0
    let lastVisibleItemWidth = 0
    const nextItemValue = nextItemNotVisible(
      containerValues.value!.width,
      totalItemsValues,
      newTranslateX.value
    )

    for (let i = 0; i < totalItemsValues.length; i++) {
      const item = totalItemsValues[i]
      totalVisibleWidth += item.width
      if (totalVisibleWidth <= containerValues.value.width) {
        lastVisibleItemWidth = nextItemValue!.width
        break
      }
    }

    const maxIndex = Math.ceil(
      (container.value!.scrollWidth - containerValues.value.width) / slideWidth
    )

    newTranslateX.value = (currentIndex + 1) * slideWidth
    if (currentIndex < maxIndex) {
      newTranslateX.value = currentIndex * slideWidth + lastVisibleItemWidth
    }

    container.value!.style.transform = `translateX(-${newTranslateX.value}px)`
    container.value!.style.transition = 'transform 0.4s ease'

    console.log('nextItemValue: ', nextItemValue)

    currentIndex++

    nextArrow.value = currentIndex < maxIndex
    prevArrow.value = true

    console.log('NEXT newTranslateX.value ________: ', newTranslateX.value)
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

<style lang="scss" src="./SlideShow.scss"></style>
