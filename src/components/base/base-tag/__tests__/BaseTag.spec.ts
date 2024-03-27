import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTag from '@/components/base/base-tag/BaseTag.vue'
import { Types } from '@/components/base/base-tag/types'

describe('BaseTag component tests', () => {
  it('should render default status when no props are provided', () => {
    const wrapper = mount(BaseTag, {
      slots: {
        default: 'Default'
      }
    })
    expect(wrapper.find('span').text()).toBe('Default')
  })

  it('should render warning status when status is warning', () => {
    const wrapper = mount(BaseTag, {
      props: {
        status: Types.Warning
      },
      slots: {
        default: 'Bloqueada'
      }
    })
    expect(wrapper.find('span').text()).toBe('Bloqueada')
  })

  it('should render damage status and damage amount when status is damage', () => {
    const wrapper = mount(BaseTag, {
      props: {
        status: Types.Damage
      },
      slots: {
        default: '5 Daños'
      }
    })
    expect(wrapper.find('span').text()).toBe('5 Daños')
  })
})
