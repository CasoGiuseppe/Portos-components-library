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

// function to retrieve the next item not visible
interface SliderItem {
  id: string
  width: number
}

/**
 * This should return an SliderItem {id: string, width: number} from a given total width container
 * from a list of items. Translate moves the position of this to find the real item hidden
 * @param totalWidth number,
 * @param items SliderItem[],
 * @param translate number,
 * @return <SliderItem | undefined>
 */
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

/**
 * WIP
 * @param totalWidth number,
 * @param lastItemId string,
 * @param items SliderItem,
 * @return number
 */
const prevSpaceAvailable = (
  totalWidth: number,
  lastItemId: string,
  items: SliderItem[]
): number => {
  const visibleItems = items.filter((item) => parseInt(item.id) < parseInt(lastItemId))
  const totalVisibleWidth = visibleItems.reduce((acc, currentItem) => acc + currentItem.width, 0)
  const spaceAvailable = totalWidth - totalVisibleWidth
  return spaceAvailable
}

const nextSlide = () => {
  if (containerValues.value && observerValues.value) {
    const containerChildren = container.value!.children
    const totalItems = containerChildren.length
    const totalItemsValues: SliderItem[] = []

    // map total items {id, width}
    for (let i = 0; i < totalItems; i++) {
      const childElement = containerChildren[i] as HTMLElement
      const id = childElement.id
      const width = childElement.offsetWidth

      totalItemsValues.push({ id, width })
    }

    console.log(totalItemsValues)

    let lastVisibleItemWidth = 0

    // get next item value {_id, _width}
    const nextItemValue = nextItemNotVisible(
      containerValues.value!.width,
      totalItemsValues,
      newTranslateX.value
    )
    // with from last visible item
    lastVisibleItemWidth = nextItemValue?.width || 120

    const maxIndex = Math.ceil(
      (container.value!.scrollWidth - containerValues.value.width) / lastVisibleItemWidth
    )

    // horizontal translation slider
    newTranslateX.value = (currentIndex + 1) * lastVisibleItemWidth
    if (currentIndex < maxIndex) {
      newTranslateX.value = currentIndex * slideWidth + lastVisibleItemWidth
      // TODO: add / remove prev space given when slider moves
      /* -
        prevSpaceAvailable(containerValues.value.width, nextItemValue!.id, totalItemsValues) */
    }

    container.value!.style.transform = `translateX(-${newTranslateX.value}px)`
    container.value!.style.transition = 'transform 0.4s ease'

    currentIndex++

    // icons visibility
    nextArrow.value = currentIndex < maxIndex
    prevArrow.value = true

    console.log('nextItemValue: ', nextItemValue)
    console.log('NEXT newTranslateX.value ________: ', newTranslateX.value)
  }
}

// TODO: refactor next/prev functions in one
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
