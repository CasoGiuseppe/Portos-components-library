import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import SliderShow from '../SliderShow.vue'
// import useResizeObserver from '@/shared/composables/useResizeObserver'

class ResizeObserverMock {
  constructor(callback: any) {}
  observe(target: any) {}
  unobserve(target: any) {}
  disconnect() {}
}

// Assign the mock to global.ResizeObserver
global.ResizeObserver = ResizeObserverMock

describe('SliderShow component', () => {
  it('should create component', async () => {
    const wrapper = mount(SliderShow, {})
  })

  describe('SliderShow component creation', () => {
    it('should create component', async () => {
      const wrapper = mount(SliderShow, {
        props: {
          id: 'testId',
          arrows: true,
          width: 120
        },
        slots: {
          content: '<div>Slide 1</div><div>Slide 2</div>',
          leftArrow: '<',
          rightArrow: '>'
        }
      })

      // Ensure that component is created
      expect(wrapper.exists()).toBe(true)

      // other expects
      expect(wrapper.props('id')).toBe('testId')
      expect(wrapper.props('arrows')).toBe(true)
      expect(wrapper.props('width')).toBe(120)
      expect(wrapper.find('.slider-show--container').text()).toBe('Slide 1Slide 2')
    })
  })
})
