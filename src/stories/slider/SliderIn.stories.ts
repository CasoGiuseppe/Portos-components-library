import type { Meta, StoryObj } from '@storybook/vue3'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { action } from '@storybook/addon-actions'
import SliderIn from '@/components/slider/SliderIn.vue'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'

const meta = {
  title: 'Slider/Slider',
  component: SliderIn,
  tags: ['autodocs'],
  args: {
    items: [
      { id: '1', title: 'title small', selected: false },
      { id: '2', title: 'my title is medium', selected: true }
      // Añade el resto de tus items aquí
    ]
  },
  subcomponents: { NavigationItemContextual }
} satisfies Meta<typeof SliderIn>

export default meta

type Story = StoryObj<typeof SliderIn>

const Templates: Story = {
  render: (args) => ({
    components: { SliderIn, BaseIcon },
    setup() {
      return { args }
    },
    template: `
    <section style="padding: 10px; background: #ccc">
    <SliderIn :items="args.sliderItems">
      <template v-for="item in args.sliderItems" :key="item.id" v-slot:[\`item-\${item.id}\`]>
        <NavigationItemContextual :id="item.id" :selected="item.selected" @send="args.handleSend">
          {{ item.title }}
        </NavigationItemContextual>
      </template>
    </SliderIn>
  </section>`,
    methods: { action: action('submitted') }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
