import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/base/base-button/BaseButton.vue'

describe('BaseButton', () => {
  it('renders button with correct classes', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {
          type: '',
          size: ''
        }
      }
    })

    expect(wrapper.classes()).toContain('primary')
    expect(wrapper.classes()).toContain('medium')
    expect(wrapper.classes()).not.toContain('disabled')
  })
  it('renders button with correct classes when not defined', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {}
      }
    })

    expect(wrapper.classes()).toContain('primary')
    expect(wrapper.classes()).toContain('medium')
    expect(wrapper.classes()).not.toContain('disabled')
  })
  it('renders button with correct classes when not defined', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {}
      }
    })

    expect(wrapper.classes()).toContain('primary')
    expect(wrapper.classes()).toContain('medium')
    expect(wrapper.classes()).not.toContain('disabled')
  })
  it('renders button with correct classes', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {
          type: 'secondary',
          size: 'small'
        }
      }
    })

    expect(wrapper.classes()).toContain('secondary')
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).not.toContain('disabled')
  })
  it('renders button with correct classes when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {
          type: 'secondary',
          size: 'small',
          disabled: true
        }
      }
    })

    expect(wrapper.classes()).toContain('secondary')
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.classes()).toContain('disabled')
  })
})
