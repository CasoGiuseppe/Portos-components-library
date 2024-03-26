import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTag from '@/components/base/base-tag/BaseTag.vue'
import { Types } from '@/components/base/base-tag/types'

const meta: Meta = {
  title: 'Base/Base Tag',
  component: BaseTag,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: Object.values(Types) },
    damage: { control: 'number' }
  },

  args: {
    status: Types.Warning,
    damage: 2
  }
}

export default meta

type Story = StoryObj

const Templates: Story = {
  render: (args) => ({
    components: { BaseTag },
    setup() {
      return { args }
    },
    template: `
      <section 
      :style="{
        'display' : 'flex',
        'gap' : '10px',
      }">
        <BaseTag v-bind="args" />
        <BaseTag v-bind="args" />
      </section>
    `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
