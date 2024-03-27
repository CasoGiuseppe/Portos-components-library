import type { Meta, StoryObj } from '@storybook/vue3'

import NavigationItemContextual from '@/components/navigation/contextual/navigation-item/NavigationItemContextual.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'

const meta = {
  title: 'Navigation/contextual',
  component: NavigationItemContextual,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    selected: { expanded: false }
  },
  args: {
    id: '0',
    selected: false
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
      <NavigationItemContextual v-bind="args">
        <template #item>
          <picture class="navigation-item__user-icon">
            <Suspense>
              <BaseIcon name="IconArrowCircleRight" type="arrow" :size="'S'" />
            </Suspense>
          </picture>
          <span class="navigation-item-contextual--content">content</span>
          <picture class="navigation-item__user-icon">
            <Suspense>
              <BaseIcon name="IconArrowCircleLeft" type="arrow" :size="'S'" />
            </Suspense>
          </picture>
        </template>
      </NavigationItemContextual>
    </section>
        `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
