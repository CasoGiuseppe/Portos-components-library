import type { Meta, StoryObj } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue';
import { Element } from '@/components/navigation/contextual/navigation-item/types';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Navigation/Contextual',
  component: NavigationItemContextual,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    elementType: { control: 'select', options: Object.values(Element) },
    selected:{ control: 'radio', options: [true, false] },
    default: { control: 'text' }
  },
  args: {
    id: 'navigationID',
    selected: false,
    elementType: Element.ROUTERLINK,
    default: 'item'
  }
} satisfies Meta<typeof NavigationItemContextual>

export default meta

type Story = StoryObj<typeof NavigationItemContextual>

const Templates: Story = {
  render: (args) => ({
    components: { NavigationItemContextual, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <section style="display: grid; gap: 10px; grid-template-columns: repeat(6, 1fr)">
      <NavigationItemContextual
        v-bind="args"
        :key="args.elementType"
        @send="action"
      >
          <Suspense>
            <BaseIcon name="IconArrowCircleRight" type="arrow" :size="'S'" />
          </Suspense>
          {{ args.default }}
          <Suspense>
            <BaseIcon name="IconArrowCircleLeft" type="arrow" :size="'S'" />
          </Suspense>
      </NavigationItemContextual>
    </section>`,
    methods: { action: action('submitted') }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}

Default.decorators = [
  vueRouter()
]
