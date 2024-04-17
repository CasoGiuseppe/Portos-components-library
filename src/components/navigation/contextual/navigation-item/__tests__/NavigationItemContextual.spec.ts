import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'
import { Element } from './../types'
describe('NavigationItemContextual', () => {
  it('should render the component correctly', () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        selected: false,
        elementType: Element.BUTTON
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('navigation-item-contextual')
  })

  it('should render as a button when elementType is set to "button"', () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        selected: false,
        elementType: Element.BUTTON
      }
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
  })
  it('should render as a button when elementType is set to "anchor"', () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        selected: false,
        elementType: Element.ANCHOR
      }
    })

    expect(wrapper.element.tagName).toBe('A')
  })

  it('should renders selected class when selected prop is true', async () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        selected: true
      }
    })

    expect(wrapper.classes()).toContain('navigation-item-contextual--is-selected')
  })

  it('should emits selected event when clicked', async () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        elementType: Element.BUTTON,
        selected: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('send')).toBeTruthy()
  })
})
