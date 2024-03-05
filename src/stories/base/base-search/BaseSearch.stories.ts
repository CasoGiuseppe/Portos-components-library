import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
    title: 'Base/BaseSearch',
    tags: ['autodocs'],
    args: {}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: () => ({
      template: `Base Search`,
    })
  }

export const Default: Story = {
    ...Template,
    args: {}
  }