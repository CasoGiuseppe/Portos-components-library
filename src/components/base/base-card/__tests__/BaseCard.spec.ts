import BaseCard from '@ui/base/base-card/BaseCard.vue'
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Status, Spacing } from '@/components/base/base-card/types' // Importando los enums Status y Spacing desde types.ts
import BaseTag from '@/components/base/base-tag/BaseTag.vue'
import BaseLink from '@/components/base/base-link/BaseLink.vue'

vi.useFakeTimers()

describe('BaseCard', () => {
  it('should render slots content correctly after loading', async () => {
    const wrapper = mount(BaseCard, {
      props: {
        isLoading: true,
        status: Status.DEFAULT,
        spacing: Spacing.L
      },
      slots: {
        title: '<div>Este es el título</div>',
        body: '<p>Este es el contenido del texto de la tarjeta.</p>',
        tag: BaseTag,
        footer: BaseLink
      }
    })

    vi.runAllTimers()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.base-card__tag').exists()).toBe(true)
    expect(wrapper.find('.base-card__tag').findComponent(BaseTag).exists()).toBe(true)

    expect(wrapper.find('.base-card__link').exists()).toBe(true)
    expect(wrapper.find('.base-card__link').findComponent(BaseLink).exists()).toBe(true)
  })
})

vi.restoreAllMocks()
