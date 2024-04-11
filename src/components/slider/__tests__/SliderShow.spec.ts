import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import SliderShow from '@ui/slider/SliderShow.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'

class IntersectionObserverMock {
  root: Element | null = null
  rootMargin: string = ''
  thresholds: ReadonlyArray<number> = []
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  constructor(
    public callback: IntersectionObserverCallback,
    public options?: IntersectionObserverInit
  ) {}

  observe(target: Element): void {}

  unobserve(target: Element): void {}

  disconnect(): void {}
}

describe('Slider Component', () => {
  beforeAll(() => {
    // @ts-ignore
    global.IntersectionObserver = IntersectionObserverMock
  })

  describe('When component loads', () => {
    it('it should render component', () => {
      const body = [
        { id: '1', label: 'Item 1', className: 'item-1' },
        { id: '2', label: 'Item 2', className: 'item-2' }
      ]

      const wrapper = mount(SliderShow, {
        props: { body },
        global: {
          components: {
            BaseIcon
          },
          stubs: {
            Suspense: true
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.findAll('.slider__item').length).toBe(body.length)
      expect(wrapper.find('.slider--is-prev').exists()).toBe(true)
      expect(wrapper.find('.slider--is-next').exists()).toBe(true)
    })
    it('should render slot content within each slider item', () => {
      const slotContent = 'Test slot content'
      const wrapper = mount(SliderShow, {
        props: { body: [{ id: '1', label: 'Item 1', className: 'item-1' }] },
        slots: {
          item: slotContent
        },
        global: {
          components: { BaseIcon },
          stubs: { Suspense: true }
        }
      })

      expect(wrapper.html()).toContain(slotContent)
    })
    it('should apply correct classes to slider items based on their properties', () => {
      const wrapper = mount(SliderShow, {
        props: { body: [{ id: '1', label: 'Item 1', className: 'custom-class' }] },
        global: {
          components: { BaseIcon },
          stubs: { Suspense: true }
        }
      })

      const firstItem = wrapper.find('.slider__item')
      expect(firstItem.classes()).toContain('custom-class')
    })
  })

  /* describe('Slider Navigation Buttons', () => {
    it('should disable the prev button when at the first item', async () => {
      const body = [
        { id: '1', label: 'Item 1', className: 'item-1' },
        { id: '2', label: 'Item 2', className: 'item-2' }
      ]

      const wrapper = mount(SliderShow, {
        props: { body },
        global: {
          components: { BaseIcon },
          stubs: { Suspense: true }
        }
      })

      // Simulate moving to the first item
      await wrapper.vm.moveTo({ type: 'prev' })

      const prevButton = wrapper.find('.slider--is-prev')
      expect(prevButton.attributes('disabled')).toBeTruthy()
    })

    it('should disable the next button when at the last item', async () => {
      const body = [
        { id: '1', label: 'Item 1', className: 'item-1' },
        { id: '2', label: 'Item 2', className: 'item-2' }
      ]

      const wrapper = mount(SliderShow, {
        props: { body },
        global: {
          components: { BaseIcon },
          stubs: { Suspense: true }
        }
      })

      // Simulate moving to the last item
      await wrapper.vm.moveTo({ type: 'next' }) // Ensure the last move would position on the last item

      const nextButton = wrapper.find('.slider--is-next')
      expect(nextButton.attributes('disabled')).toBeTruthy()
    })
  }) */
})
