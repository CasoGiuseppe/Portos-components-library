import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

describe('NavigationItemContextual', () => {
  it('should renders component correctly', () => {
    const wrapper = mount(NavigationItemContextual, {
      props: {
        id: 'testId',
        selected: false
      },
      slots: {
        content: '<span>Test Content</span>'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testID="ui-navigation-item-contextual"]').exists()).toBe(true)
    expect(wrapper.find('.navigation-item-contextual--content').text()).toBe('Test Content')
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
        selected: false
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('selected')).toBeTruthy()
  })
})
