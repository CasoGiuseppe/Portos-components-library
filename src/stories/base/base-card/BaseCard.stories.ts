import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from '@ui/base/base-card/BaseCard.vue'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import BaseTag from '@/components/base/base-tag/BaseTag.vue'
import BaseLink from '@/components/base/base-link/BaseLink.vue'
import { Status, Spacing } from '@/components/base/base-card/types'

const meta: Meta = {
  title: 'Base/Base Card',
  tags: ['autodocs'],
  component: BaseCard,
  argTypes: {
    id: { control: 'text' },
    status: { control: 'select', options: Object.values(Status) },
    spacing: { control: 'select', options: Object.values(Spacing) },
    title: { control: 'text' },
    loader: { control: 'text' },
    body: { control: 'text' },
    footer: { control: 'text' },
  },
  args: {
    id: 'CardId',
    status: Status.DEFAULT,
    spacing: Spacing.L,
    title: 'Title',
    loader: 'wait for load ...',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing. Mauris finibus efficitur dolor sit amet, dolor sit amet, consectetur sit del conse (...)',
    footer: '<a href="#">Link</a>',
  }
}

export default meta

type Story = StoryObj<typeof BaseCard>

const Templates: Story = {
  render: (args) => ({
    components: { BaseCard, BaseIcon, BaseTag, BaseLink },
    setup() {
      return { args }
    },
    template: `
    <div>
    <BaseCard v-bind="args">
      <template #title>
        <p>{{ args.title }}</p>
      </template>
      <template #tag>
        <BaseTag status="warning" id="tag-warning">
          <BaseIcon name="IconArrowCircleRight" type="arrow" size="S" />
          Warning
        </BaseTag>
        <BaseTag status="damage" id="tag-damage">
          <BaseIcon name="IconArrowCircleRight" type="arrow" size="S" />
          Damage
        </BaseTag>
      </template>
      <template #body>
        <p>{{ args.body }}</p>
      </template>
      <template #footer>
        <BaseLink elementType="a" size="M" href="https://amaris.com/"> 
          Link
        </BaseLink>
      </template>
    </BaseCard>
  </div>
  
`
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
