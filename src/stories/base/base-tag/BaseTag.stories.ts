import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTag from '@/components/base/base-tag/BaseTag.vue'
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue'
import { Types } from '@/components/base/base-tag/types'

const meta: Meta = {
  title: 'Base/Base Tag',
  component: BaseTag,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: Object.values(Types) },
    default: { control: 'text' },
  },

  args: {
    status: Types.Default,
    default: 'Default'
  }
}

export default meta

type Story = StoryObj

const Templates: Story = {
  render: (args) => ({
    components: { BaseTag, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <section 
      :style="{
        'display' : 'flex',
        'gap' : '10px',
      }">
        <BaseTag v-bind="args" >
        <Suspense>
        <BaseIcon name="IconArrowCircleRight" type="arrow" size="S"/>
        </Suspense>
        {{args.default}}
        </BaseTag>
      </section>
    `
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
