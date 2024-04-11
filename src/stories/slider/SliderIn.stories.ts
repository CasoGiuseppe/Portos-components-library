import type { Meta, StoryObj } from '@storybook/vue3'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import SliderIn from '@ui/slider/SliderIn.vue'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

const meta: Meta<typeof SliderIn> = {
  title: 'Slider/Slider',
  component: SliderIn,
  tags: ['autodocs'],
  args: {
    // Argumentos por defecto para tus historias
    items: [
      { id: '1', title: 'title small', selected: false },
      { id: '2', title: 'my title is medium', selected: true },
      { id: '3', title: 'this is a big title for testing', selected: false },
      { id: '4', title: 'Noatum', selected: false },
      { id: '5', title: 'PortOs', selected: false },
      { id: '6', title: 'Home', selected: false },
      { id: '7', title: 'Email', selected: false },
      { id: '8', title: 'Please contact us', selected: false }
      // Añade el resto de tus items aquí
    ]
  },

  subcomponents: { NavigationItemContextual, BaseIcon }
}

export default meta

type Story = StoryObj<typeof SliderIn>

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { SliderIn, NavigationItemContextual, BaseIcon },
    setup() {
      // Pasa los argumentos de la historia a tu componente de forma reactiva
      return { args }
    },
    template: `
      <section style="padding: 10px; background: #ccc">
        <SliderIn :items="args.items">
          <template v-for="item in args.items" :key="item.id" v-slot:[\`item-\${item.id}\`]>
            <NavigationItemContextual 
              :id="item.id" 
              :selected="item.selected" 
              @send="args.handleSend"
            >
              {{ item.title }}
            </NavigationItemContextual>
          </template>
        </SliderIn>
      </section>
    `,
    methods: {
      handleSend: (id: string) => {
        args.items = args.items!.map((item) => ({
          ...item,
          selected: item.id === id
        }))
      }
    }
  })
}
