import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
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

  describe('Interaction with navigation buttons', () => {
    let wrapper: any
    beforeEach(() => {
      const body = [
        { id: '1', label: 'Item 1', className: 'item-1' },
        { id: '2', label: 'Item 2', className: 'item-2' },
        { id: '3', label: 'Item 3', className: 'item-3' }
      ]

      const slotContent = '<span>Test slot content</span>'
      wrapper = mount(SliderShow, {
        props: { body },
        slots: {
          item: `<template #item="{ label, id }">${slotContent}</template>`
        },
        global: {
          components: { BaseIcon },
          stubs: { Suspense: true }
        }
      })

      // Stubbing internal methods to monitor calls and behavior.
      vi.spyOn(wrapper.vm, 'moveTo')
      vi.spyOn(wrapper.vm, 'setNewPositionVariable')
    })

    it('should call moveTo with prev when previous button is clicked', async () => {
      await wrapper.find('.slider--is-prev').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.moveTo).toHaveBeenCalledWith({ type: 'prev' })
    })

    it('should call moveTo with next when next button is clicked', async () => {
      await wrapper.find('.slider--is-next').trigger('click')
      expect(wrapper.vm.moveTo).toHaveBeenCalledWith({})
    })
    /* 
    it('should update position when next is clicked', async () => {
      await wrapper.find('.slider--is-next').trigger('click')
      expect(wrapper.vm.setNewPositionVariable).toHaveBeenCalled()
    })
    
    it('should disable navigation buttons during transition', async () => {
      await wrapper.find('.slider--is-next').trigger('click')
      expect(wrapper.vm.isDisabled.value).toBe(true)
      await wrapper.setData({ isDisabled: false })
      expect(wrapper.vm.isDisabled.value).toBe(false)
    }) */
  })
})
