import type { ComponentPublicInstance } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Vue from 'vue';

import BaseTextarea from '@/components/base/base-textarea/BaseTextarea.vue'

describe('BaseTextarea', () => {
  describe('Test errors handles', () => {
    it('should update character count when input changes', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          id: 'textarea-1',
          disabled: false
        },
        slots: {
          label: 'Slot label',

          error: `
            
            <span>error</span>
          `,
          message: 'this is my message'
        }
      })

      const textarea = wrapper.find('textarea')
      await textarea.setValue('Hello')
      const vm = wrapper.vm as ComponentPublicInstance<any & { value: number }>

      expect(vm.value.length).toBe(5)
    })

    it('should show error message', async () => {
      const wrapper = mount(BaseTextarea, {
        slots: {
          error: 'This is an error message'
        },
        props: {
          required: true
        }
      })
      const errorMessage = wrapper.find('[data-testID="ui-textarea-error"]')
      expect(errorMessage.exists()).toBeTruthy()
      expect(errorMessage.text()).toBe('This is an error message')
    })
  })

  describe('Test user events behaviours', () => {
    it('should clear textarea', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          required: false,
          proxyValue: 'test'
        },
        slots: {
          clear: 'X'
        }
      })
      const vm = wrapper.vm as ComponentPublicInstance<any & { value: string }>
      await wrapper.vm.$nextTick()

      const clearButton = await wrapper.find('[data-testID=ui-textarea-clear]')
      await clearButton.trigger('click')
      expect(vm.value).toBe('')
    })
  })

  describe('Test textarea errors', () => {
    it('should show error icon', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          required: true
        },
        slots: {
          error: 'an error string'
        }
      })

      const vm = wrapper.vm as ComponentPublicInstance<any & { hasError: boolean; value: string }>
      vm.hasError = true
      vm.value = ''
      await wrapper.vm.$nextTick()
      const error = wrapper.find('[data-testID=ui-textarea-error]')
      console.log({ hasError: vm.hasError, value: vm.value, error: error })

      expect(error.exists()).toBe(true)
    })
  })

  describe('Test emits behaviours', () => {
    it('should emit "change" event when the textarea value changes', async () => {
      const wrapper = mount(BaseTextarea)
      const textarea = wrapper.find('textarea')

      await textarea.setValue('New value')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.length).toBe(1)
      expect(wrapper.emitted('change')?.[0]).toEqual([{ target: textarea.element }])
    })

    it.only('should emit "cleared" event when the textarea is cleared', async () => {
      const wrapper = mount(BaseTextarea, {
        props: {
          required: false,
          proxyValue: 'test'
        },
        slots: {
          clear: 'X'
        }
      })
      const textarea = wrapper.find('textarea')

      await textarea.setValue('New value')
      await wrapper.vm.$nextTick()

      const clearButton = await wrapper.find('[data-testID=ui-textarea-clear]')
      await clearButton.trigger('click')

      expect(wrapper.emitted('cleared')).toBeTruthy()
      expect(wrapper.emitted('cleared')?.length).toBe(1)
    })
  })
})
