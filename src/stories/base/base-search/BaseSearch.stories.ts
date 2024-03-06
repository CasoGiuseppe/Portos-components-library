import BaseSearch from '@ui/base/base-search/BaseSearch.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Base/BaseSearch',
  component: BaseSearch,
  tags: ['autodocs'],
  args: {
    suggestions: [
      { id: 'A1B2C3', city: 'New York', carCount: 100, manager: 'John Doe' },
      { id: 'B4E5F6', city: 'Los Angeles', carCount: 80, manager: 'Jane Smith' },
      { id: 'C7H8I9', city: 'Chicago', carCount: 120, manager: 'Michael Johnson' }
    ]
  }
} as Meta<typeof BaseSearch>

export default meta

type Story = StoryObj<typeof BaseSearch>

const Template: Story = {
  render: (args) => ({
    components: { BaseSearch },
    setup() {
      return { args }
    },
    template: `
      <div>
        <BaseSearch v-bind="args">
          <template #default="{ suggestions, handleSuggestionClick }">
            <ul>
              <li v-for="(suggestion, index) in suggestions" :key="suggestion.id" @click="handleSuggestionClick(suggestion)">
                {{ suggestion.id }} - {{ suggestion.city }} - {{ suggestion.carCount }} - {{ suggestion.manager }}
              </li>
            </ul>
          </template>
        </BaseSearch>
      </div>
    `
  })
}

export const Default: Story = {
  ...Template,
  args: {}
}
