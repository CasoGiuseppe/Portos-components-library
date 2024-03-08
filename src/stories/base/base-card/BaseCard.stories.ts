import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from '@ui/base/base-card/BaseCard.vue'
import IconFeedbackInfo from '@ui/icons/feedback/IconFeedbackInfo.vue'

const meta: Meta = {
  title: 'Base/BaseCard',
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
    components: { BaseCard, IconFeedbackInfo },
    setup() {
      return { args }
    },
    template: `
  <div>
    <BaseCard>
      <template #title>
      <p>{{ args.title }}</p>
        <IconFeedbackInfo />
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
