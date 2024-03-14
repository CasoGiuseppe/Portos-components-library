import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/base/base-button/BaseButton.vue'
import { Types, Sizes } from './../types'

describe('BaseButton', () => {
  it('renders button with default props', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.attributes('id')).toBe('buttonId')
    expect(wrapper.classes()).toContain('base-button')
    expect(wrapper.classes()).toContain('base-button--is-primary')
    expect(wrapper.classes()).toContain('base-button--is-L')
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('title')).toBeUndefined()
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('renders button with provided props', () => {
    const props = {
      id: 'customButtonId',
      type: Types.SECONDARY,
      variant: true,
      size: Sizes.M,
      disabled: true,
      label: 'Custom Label'
    }
    const wrapper = mount(BaseButton, { props })
    expect(wrapper.attributes('id')).toBe(props.id)
    expect(wrapper.classes()).toContain('base-button--is-secondary')
    expect(wrapper.classes()).toContain('base-button--is-M')
    expect(wrapper.classes()).toContain('base-button--is-secondary-ALT')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('title')).toBe(props.label)
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('aria-label')).toBe(props.label)
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
