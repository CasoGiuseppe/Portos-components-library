import type { Meta, StoryObj } from '@storybook/vue3'
import BaseLink from '@/components/base/base-link/BaseLink.vue'
import { Element, Sizes } from '@/components/base/base-link/types'

const meta: Meta = {
  title: 'Base/v1.0/Base Link',
  component: BaseLink,
  tags: ['autodocs'],
  args: {
    label: 'Base Link',
    size: Sizes.M,
    variant: false,
    disabled: false,
    elementType: Element.ANCHOR,
    href: 'https://amaris.com/'
  },
  argTypes: {
    size: { control: 'select', options: Object.values(Sizes) },
    elementType: { control: 'select', options: Object.values(Element) },
    href: { control: 'text' }
  }
}

export default meta

type Story = StoryObj

const Templates: Story = {
  render: (args) => ({
    components: { BaseLink },
    setup() {
      return { args }
    },
    template: `
        <section>
          <BaseLink v-bind="args">
            <template #default>{{ args.label }}</template>
          </BaseLink>
        </section>
    `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
