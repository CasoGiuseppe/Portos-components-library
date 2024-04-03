import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCheckbox from '@/components/base/base-checkbox/BaseCheckbox.vue'
import { Sizes, Types } from '@/components/base/base-checkbox/types'
import { action } from '@storybook/addon-actions'

const meta: Meta = {
  title: 'Base/Base Checkbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    type: { control: 'select', options: Object.values(Types) },
    size: { control: 'select', options: Object.values(Sizes) }
  },

  args: {
    id: 'checkboxId',
    label: 'Label',
    size: Sizes.M,
    type: Types.DEFAULT,
    variant: false
  }
} as Meta<typeof BaseCheckbox>

export default meta

type Story = StoryObj

const Templates: Story = {
  render: (args) => ({
    components: {},
    setup() {
      return { args }
    },
    template: `
    <section
    :style="{
      display: 'flex',
      gap: '10px',
      padding: '10px',
    }"
  >
    <BaseCheckbox @checked="action" :status="'error'" :size="'S'" :variant="true">
      Label checkbox
    </BaseCheckbox>
  </section>
    `,
    methods: { action: action('checked') }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
