import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
    title: 'Foundations/Colors',
    args: {}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: () => ({
      template: `colors`,
    })
  }

export const Default: Story = {
    ...Template,
    args: {}
  }