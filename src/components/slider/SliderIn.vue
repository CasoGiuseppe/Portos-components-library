<template>
  <!-- Poor Draco Malfoy, never was understood enought-->
  <section class="slider">
    <button @click="moveTo({ type: 'prev' })" class="slider--is-prev">
      <Suspense>
        <BaseIcon id="card" :type="Types.CHEVRON" name="IconChevronLeftM" :size="Sizes.S" />
      </Suspense>
    </button>

    <section class="slider__wrapper">
      <ul class="slider__list" ref="list">
        <li v-for="item in items" :key="item.id" class="slider__item">
          <slot :name="`item-${item.id}`"></slot>
        </li>
      </ul>
    </section>
    <button @click="moveTo({})" class="slider--is-next">
      <Suspense>
        <BaseIcon id="card" :type="Types.CHEVRON" name="IconChevronRightM" :size="Sizes.S" />
      </Suspense>
    </button>
  </section>
</template>

<script setup lang="ts">
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver'
import { onMounted, ref } from 'vue'
import BaseIcon from '../base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '../base/base-icon/types'

const list = ref<HTMLElement | null>(null)
const currentHTMLNode = ref<HTMLElement | null>(null)

const canMovePrev = ref(true)
const canMoveNext = ref(true)

withDefaults(defineProps<{ items: any[] }>(), {
  /**
   * Set slider items list content
   */
  items: () => []
})

const { createObserver } = useIntersectionObserver({
  action: (e: any) => {
    const { isIntersecting } = e
    e.target.dataset.visible = isIntersecting
  }
})

const updateMovePossibility = () => {
  if (!list.value || !currentHTMLNode.value) {
    canMoveNext.value = false
    canMovePrev.value = false
    return
  }

  canMovePrev.value = !!currentHTMLNode.value.previousElementSibling
  canMoveNext.value = !!currentHTMLNode.value.nextElementSibling
}

const moveTo = ({ type = 'next' }: { type?: string }): void => {
  console.log('1) move to', currentHTMLNode.value)
  if ((type === 'prev' && !canMovePrev.value) || (type === 'next' && !canMoveNext.value)) return
  if (!list.value) return
  if (!currentHTMLNode.value) return
  setNewPositionVariable({
    position: getNextTargetPosition({
      current: getNextPrevSibling({ element: currentHTMLNode.value, type })
    })
  })

  updateMovePossibility()
}

const getNextPrevSibling = ({
  element,
  type = 'next'
}: {
  element: HTMLElement
  type?: string
}): HTMLElement => {
  const target = type === 'next' ? element.nextElementSibling : element.previousElementSibling
  console.log('2.2) => sibling', target)
  const HTMLTarget = target as HTMLElement
  currentHTMLNode.value = HTMLTarget

  return HTMLTarget
}

const getNextTargetPosition = ({ current }: { current: HTMLElement }): number => {
  console.log('3) current.OFFSETLEFT', current.offsetLeft)
  currentHTMLNode.value = current
  return current.offsetLeft
}

const setNewPositionVariable = ({ position }: { position: number }): void => {
  if (!list.value) return
  list.value.style.setProperty('--slider-position', `${position?.toString()}px` || '0')
  console.log('4) set new position', list.value, position)
}

onMounted(() => {
  const listCollection = list.value
  if (!listCollection) return

  const childElements = Array.from(listCollection.childNodes).filter(
    (node) => node.nodeType === Node.ELEMENT_NODE
  ) as HTMLElement[]

  if (childElements.length > 0) {
    currentHTMLNode.value = childElements[0]
  }

  console.log(listCollection)

  currentHTMLNode.value = listCollection.children[0] as HTMLElement //listCollection.firstChild as HTMLElement
  //console.log(currentHTMLNode.value.offsetLeft)
  childElements.forEach((element) => {
    createObserver({
      element: element,
      options: {
        threshold: 1
      }
    })
  })

  list.value!.style.setProperty('--slider-position', `0px`)
})
</script>
<style src="./SliderIn.scss" lang="scss"></style>
