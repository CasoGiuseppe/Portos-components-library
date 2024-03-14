import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { Sizes, Types } from '../types'

describe('BaseIcon', () => {
  it('renders the component with default props', async () => {
    const wrapper = mount(BaseIcon, {
      // name & type are required
      props: {
        name: 'IconArrowCircleDown',
        type: Types.ARROW
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.base-icon').exists()).toBe(true)
    expect(wrapper.find('.base-icon--is-M').exists()).toBe(true)
  })
  it('renders the component with size L props', async () => {
    const wrapper = mount(BaseIcon, {
      // name & type are required
      props: {
        name: 'IconArrowCircleDown',
        type: Types.ARROW,
        size: Sizes.L
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.base-icon').exists()).toBe(true)
    expect(wrapper.find('.base-icon--is-L').exists()).toBe(true)
  })
  it('renders the component with size S props', async () => {
    const wrapper = mount(BaseIcon, {
      // name & type are required
      props: {
        name: 'IconArrowCircleDown',
        type: Types.ARROW,
        size: Sizes.S
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.base-icon').exists()).toBe(true)
    expect(wrapper.find('.base-icon--is-S').exists()).toBe(true)
  })

  it('renders the component with size S props', async () => {
    const wrapper = mount(BaseIcon, {
      // name & type are required
      props: {
        name: 'IconArrowCircleDown',
        type: Types.ARROW,
        size: Sizes.XS
      }
    })

    await wrapper.vm.$nextTick()

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.base-icon').exists()).toBe(true)
    expect(wrapper.find('.base-icon--is-XS').exists()).toBe(true)
  })
})
