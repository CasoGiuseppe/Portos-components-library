import BaseSearch from '@ui/base/base-search/BaseSearch.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const search = (value: string) => {
  return results.filter(
    ({ id }) => id.toLowerCase().includes(value.toLowerCase())
  ).reduce((acc: any, item: any) => {
    return [...acc, { label: item.id }];
  }, [])
};

const results = [
  { id: 'A1B2C3', city: 'New York', carCount: 100, manager: 'John Doe' },
  { id: 'B4E5F6', city: 'Los Angeles', carCount: 80, manager: 'Jane Smith' },
  { id: 'C7H8I9', city: 'Chicago', carCount: 120, manager: 'Michael Johnson' }
]

const meta = {
  title: 'Base/BaseSearch',
  component: BaseSearch,
  tags: ['autodocs'],
  argTypes: {
    search: () => {},
    searchResults: { control: 'array' },
    placeholder: { control: 'text' },
    loading: { control: 'radio', options: [true, false] },
    alert: { if: { arg: 'searchResults', eq: [] }, control: 'text'}
  },
  args: {
    placeholder: 'put here your search text',
    searchResults: undefined,
    loading: false,
    alert: 'alert'
  }
} as Meta<typeof BaseSearch>

export default meta

type Story = StoryObj<typeof BaseSearch>

const Template: Story = {

  render: (args, { updateArgs }) => ({
    components: { BaseSearch },
    setup() {
      return { args }
    },
    template: `
      <div>
        <BaseSearch
          v-bind="args"
          v-on:update:modelValue="handleResponseUpdate"
          @onReset="resetResponse"
        >
          <template #list="{ property: { label } }">{{ label }}</template>
          <template #alert v-if="args.searchResults?.length === 0">no results found</template>
        </BaseSearch>
      </div>
    `,
    methods: {
      handleResponseUpdate(value: string) {
        updateArgs({ ...args, searchResults: search(value) })
      },
      resetResponse() {
        updateArgs({ ...args, searchResults: undefined })
      }
    }
  })
}

export const Default: Story = {
  ...Template,
  args: {}
}
