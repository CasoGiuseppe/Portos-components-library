import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

import SliderShow from '@/components/slider/SliderShow.vue'
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'

const meta = {
  title: 'Slider/slider',
  component: SliderShow,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    arrows: { expanded: true },
    width: { control: 'number' }
  },
  args: {
    id: '1',
    arrows: true,
    width: 80
  }
} satisfies Meta<typeof SliderShow>

export default meta

type Story = StoryObj<typeof SliderShow>

const Templates: Story = {
  render: (args) => ({
    components: { SliderShow, BaseIcon, NavigationItemContextual },
    setup() {
      return { args }
    },
    template: `
      <section>
        <div style="padding: 3rem">
          <SliderShow v-bind="args">
            <template #content>
              <NavigationItemContextual
                style="margin: 0.5rem"
                v-for="i in 20"
                :key="i"
                :id="i"
                @selected="selected"
                :selected="itemSelected === i"
              >
                <template #item> tab {{ i }} </template>
              </NavigationItemContextual>
            </template>
            <template #leftArrow>
            <
            </template>
            <template #rightArrow>
            >
            </template>
            
          </SliderShow>
        </div>
      </section>
    `,
    methods: {
      selected: action('selected')
    }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
