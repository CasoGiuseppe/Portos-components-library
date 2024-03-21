import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLink from '@/components/base/base-link/BaseLink.vue'
import { Types, Sizes, Element } from '@/components/base/base-link/types'

let $wrapper: any
describe('BaseLink component tests', () => {
  beforeEach(() => {
    $wrapper = mount(BaseLink, {
      props: {
        id: 'LinkId',
        type: Types.PRIMARY,
        size: Sizes.M,
        variant: false,
        disabled: false,
        label: 'Link',
        elementType: Element.ANCHOR
      }
    })
  })

  describe('Test rendering behaviors', () => {
    it('Should render with correct id', () => {
      expect($wrapper.attributes('id')).toBe('LinkId')
    })

    it('Should render with correct classes', () => {
      const expectedClasses = ['base-link', 'base-link--is-primary', 'base-link--is-M']
      expectedClasses.forEach((className) => {
        expect($wrapper.classes()).toContain(className)
      })
    })

    it('Should render with correct label', () => {
      expect($wrapper.attributes('aria-label')).toBe('Link')
    })

    it('Should render as an anchor when elementType is ANCHOR', () => {
      expect($wrapper.element.tagName).toBe('A')
    })

    it('Should render as a button when elementType is BUTTON', async () => {
      await $wrapper.setProps({ elementType: Element.BUTTON })
      expect($wrapper.element.tagName).toBe('BUTTON')
    })
  })

  describe('Test emits behaviors', () => {
    it('Should emit "send" when clicked and elementType is BUTTON', async () => {
      await $wrapper.setProps({ elementType: Element.BUTTON })
      await $wrapper.trigger('click')
      await $wrapper.vm.$nextTick()
      expect($wrapper.emitted().send).toBeUndefined()
    })

    it('Should not emit "send" when clicked and elementType is ANCHOR', async () => {
      await $wrapper.trigger('click')
      expect($wrapper.emitted().send).toBeUndefined()
    })
  })
})
