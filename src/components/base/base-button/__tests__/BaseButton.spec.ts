import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/base/base-button/BaseButton.vue'

describe('BaseButton', () => {
  it('renders button with correct classes', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        config: {
          type: '',
          size: 'large',
          disabled: false
        }
      }
    })

    expect(wrapper.classes()).toContain('primary')
    expect(wrapper.classes()).toContain('large')
    expect(wrapper.classes()).not.toContain('disabled')
  })
})
