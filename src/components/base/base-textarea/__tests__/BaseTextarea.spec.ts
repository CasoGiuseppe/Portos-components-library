import type { ComponentPublicInstance } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import BaseTextarea from '@/components/base/base-textarea/BaseTextarea.vue'
import type { TextareaProps } from '@/components/base/base-textarea/models/baseTextarea'

describe('BaseTextarea', () => {
  it('updates character count when input changes', async () => {
    const wrapper = mount(BaseTextarea)
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello')
    const vm = wrapper.vm as ComponentPublicInstance<TextareaProps & { characterCount: number }>
    expect(vm.characterCount).toBe(5)
  })

  describe('Error icon and help text display', () => {
    it('shows error icon and help text when character count exceeds maxLength', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          maxLength: 5
        }
      })

      const textarea = wrapper.find('textarea')
      await textarea.setValue('This is too long')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.base-textarea--footer-help_area-icon_error').exists()).toBe(true)
      expect(wrapper.find('.base-textarea--footer-help_area-help_text.error').text()).toBe(
        'Help text'
      )
    })
  })

  describe('Textarea clearing', () => {
    it('clears textarea when clear button is clicked', async () => {
      const wrapper = mount(BaseTextarea)
      const textarea = wrapper.find('textarea')
      await textarea.setValue('Some text')

      await wrapper.vm.$nextTick()

      const clearButton = wrapper.find('.base-textarea--wrapper-clear_text')
      await clearButton.trigger('click')

      await wrapper.vm.$nextTick()
      const vm = wrapper.vm as ComponentPublicInstance<
        TextareaProps & { characterCount: number; text: string }
      >

      expect(vm.text).toBe('')
      expect(vm.characterCount).toBe(0)
    })
  })

  describe('Event emission', () => {
    it('emits textareaError event when character count exceeds maxLength', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          maxLength: 5
        }
      })

      const textarea = wrapper.find('textarea')
      await textarea.setValue('This is too long')

      await wrapper.vm.$nextTick()

      const emittedTextareaError = wrapper.emitted('textareaError')
      expect(emittedTextareaError).toBeTruthy()

      if (emittedTextareaError) {
        expect(emittedTextareaError[0][0]).toEqual({ error: 'TEXT_SIZE_EXCEEDED' })
      }
    })
  })
})
