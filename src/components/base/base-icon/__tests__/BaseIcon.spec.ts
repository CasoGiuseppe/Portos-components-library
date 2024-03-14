import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'

describe('YourComponent', () => {
  it('renders the component with default props', async () => {
    const wrapper = mount(BaseIcon)

    // Espera a que el componente asíncrono se resuelva
    await wrapper.vm.$nextTick()

    // Verifica que la clase base-icon esté presente
    expect(wrapper.find('.base-icon').exists()).toBe(true)

    // Verifica que la clase base-icon--is-M esté presente (asumiendo que el tamaño por defecto es 'M')
    expect(wrapper.find('.base-icon--is-M').exists()).toBe(true)

    // Puedes agregar más aserciones según sea necesario para tus requisitos específicos
  })

  // Puedes agregar más pruebas para cubrir otros casos, como por ejemplo, cuando se cambian las props
})
