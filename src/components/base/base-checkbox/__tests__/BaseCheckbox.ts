import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTag from '@/components/base/base-checkbox/BaseCheckbox.vue'
import { Types } from '@/components/base/base-checkbox/types'

describe('BaseTag component tests', () => {
  it('should render default status when no props are provided', () => {
    const wrapper = mount(BaseTag, {
      slots: {
        default: 'DEFAULT'
      }
    })
    expect(wrapper.find('span').text()).toBe('default')
  })
})
