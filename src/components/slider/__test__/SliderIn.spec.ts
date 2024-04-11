import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SliderIn from '@ui/slider/SliderIn.vue'

describe('Slider Component', () => {
  describe('When rendered', () => {
    const sliderItems = [
      { id: '1', title: 'Item 1', selected: false },
      { id: '2', title: 'Item 2', selected: false },
      { id: '3', title: 'Item 3', selected: false }
    ]

    it('should display all slider items passed as props', async () => {
      const wrapper = mount(SliderIn, {
        props: { items: sliderItems }
      })

      await wrapper.vm.$nextTick()

      const itemElements = wrapper.findAll('.slider__item')
      expect(itemElements.length).toBe(sliderItems.length)
    })

    it('should initially set the first slider item as the current HTML node', async () => {
      const wrapper = mount(SliderIn, {
        props: { items: sliderItems }
      })

      await wrapper.vm.$nextTick()

      const firstItemElement = wrapper.find('.slider__item:first-child')
      expect(firstItemElement.classes()).toContain('is-current')
    })
  })

  describe('User interactions', () => {
    const sliderItems = [
      { id: '1', title: 'Item 1', selected: false },
      { id: '2', title: 'Item 2', selected: true },
      { id: '3', title: 'Item 3', selected: false }
    ]

    describe('When clicking the "next" button', () => {
      it('should move the slider to the next item', async () => {
        const wrapper = mount(SliderIn, {
          props: { items: sliderItems }
        })

        await wrapper.find('.slider--is-next').trigger('click')
        await wrapper.vm.$nextTick()

        const currentItem = wrapper.findAll('.slider__item').at(1)
        expect(currentItem!.classes()).toContain('is-current')
      })

      it('should not move beyond the last slider item', async () => {
        const wrapper = mount(SliderIn, {
          props: { items: sliderItems }
        })

        for (let i = 0; i < sliderItems.length + 1; i++) {
          await wrapper.find('.slider--is-next').trigger('click')
        }
        await wrapper.vm.$nextTick()

        const lastItem = wrapper.findAll('.slider__item').at(sliderItems.length - 1)
        expect(lastItem!.classes()).toContain('is-current')
      })
    })

    describe('When clicking the "prev" button', () => {
      it('should move the slider to the previous item', async () => {
        const wrapper = mount(SliderIn, {
          props: { items: sliderItems }
        })

        await wrapper.find('.slider--is-next').trigger('click')
        // Luego, vuelve al anterior
        await wrapper.find('.slider--is-prev').trigger('click')
        await wrapper.vm.$nextTick()

        const firstItem = wrapper.findAll('.slider__item').at(0)
        expect(firstItem!.classes()).toContain('is-current')
      })

      it('should not move before the first slider item', async () => {
        const wrapper = mount(SliderIn, {
          props: { items: sliderItems }
        })

        for (let i = 0; i < sliderItems.length; i++) {
          await wrapper.find('.slider--is-prev').trigger('click')
        }
        await wrapper.vm.$nextTick()

        const firstItem = wrapper.findAll('.slider__item').at(0)
        expect(firstItem!.classes()).toContain('is-current')
      })
    })
  })
})
