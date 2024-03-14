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
      // Montamos el componente con una longitud máxima de caracteres reducida para simular el exceso
      const wrapper = mount(BaseTextarea, {
        props: {
          maxLength: 5 // Establecer una longitud máxima baja para forzar el error
        }
      })

      // Encontramos el área de texto y establecemos un valor que exceda la longitud máxima
      const textarea = wrapper.find('textarea')
      await textarea.setValue('This is too long')

      // Esperamos que se actualice el estado del componente
      await wrapper.vm.$nextTick()

      // Verificamos si se muestra el icono de error y el texto de ayuda
      expect(wrapper.find('.base-textarea--footer-help_area-icon_error').exists()).toBe(true)
      expect(wrapper.find('.base-textarea--footer-help_area-help_text.error').text()).toBe(
        'Help text'
      )
    })
  })

  describe('Textarea clearing', () => {
    it('clears textarea when clear button is clicked', async () => {
      // Montamos el componente
      const wrapper = mount(BaseTextarea)

      // Encontramos el área de texto y establecemos un valor inicial
      const textarea = wrapper.find('textarea')
      await textarea.setValue('Some text')

      // Esperamos que se actualice el estado del componente
      await wrapper.vm.$nextTick()

      // Encontramos el botón de limpieza y hacemos clic en él
      const clearButton = wrapper.find('.base-textarea--wrapper-clear_text')
      await clearButton.trigger('click')

      // Esperamos que se actualice el estado del componente
      await wrapper.vm.$nextTick()
      const vm = wrapper.vm as ComponentPublicInstance<
        TextareaProps & { characterCount: number; text: string }
      >

      // Verificamos si el área de texto se ha limpiado correctamente
      expect(vm.text).toBe('')
      expect(vm.characterCount).toBe(0)
    })
  })

  describe('Event emission', () => {
    it('emits textareaError event when character count exceeds maxLength', async () => {
      // Montamos el componente con una longitud máxima de caracteres reducida para simular el exceso
      const wrapper = mount(BaseTextarea, {
        props: {
          maxLength: 5 // Establecer una longitud máxima baja para forzar el error
        }
      })

      // Encontramos el área de texto y establecemos un valor que exceda la longitud máxima
      const textarea = wrapper.find('textarea')
      await textarea.setValue('This is too long')

      // Esperamos que se actualice el estado del componente
      await wrapper.vm.$nextTick()

      // Verificamos si se emitió correctamente el evento textareaError
      const emittedTextareaError = wrapper.emitted('textareaError')
      expect(emittedTextareaError).toBeTruthy()

      // Verificamos si se emitió correctamente el evento con datos correctos
      if (emittedTextareaError) {
        expect(emittedTextareaError[0][0]).toEqual({ error: 'TEXT_SIZE_EXCEEDED' })
      }
    })
  })
})
