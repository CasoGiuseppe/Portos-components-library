import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from '@ui/base/base-card/BaseCard.vue'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'

const meta: Meta = {
  title: 'Base/v1.0/Base Card',
  tags: ['autodocs'],
  component: BaseCard,
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' }
  }
}

export default meta

type Story = StoryObj<typeof BaseCard>

const Templates: Story = {
  render: (args) => ({
    components: { BaseCard, BaseIcon },
    setup() {
      return { args }
    },
    template: `
  <div>
    <BaseCard>
      <template #title>
      <p>{{ args.title }}</p>
        <BaseIcon />
      </template>
      <template #body>
        <p>{{ args.body }}</p>
      </template>
    </BaseCard>
  </div>
`
  })
}

export const Default: Story = {
  ...Templates,
  args: { title: 'Título de ejemplo', body: 'Texto de ejemplo' }
}
