import { describe, it, expect, beforeEach } from 'vitest'
import { mountComponent } from '@tests/utilities'

import SliderShow from '../SliderShow.vue'
import useResizeObserver from '@/shared/composables/useResizeObserver'

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {}
  observe(target: Element) {}
  unobserve(target: Element) {}
  disconnect() {}
}

;(global as any).ResizeObserver = ResizeObserverMock
let $wrapper: any
const $providedContent = `<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>`

describe('SliderShow', () => {
  beforeEach(async () => {
    $wrapper = await mountComponent(SliderShow, {
      props: {
        id: '1',
        arrows: true,
        width: 120
      },
      slots: {
        content: $providedContent,
        leftArrow: '<',
        rightArrow: '>'
      }
    })
  })

  it('should increase currentIndex when calling nextSlide', async () => {
    const initialIndex = $wrapper.vm.currentIndex
    console.log($wrapper)
    await $wrapper.vm.nextSlide()
    console.log($wrapper.vm.currentIndex)
    console.log(initialIndex)
    expect($wrapper.vm.currentIndex).toBe(1)
  })
})
