import type { Meta, StoryObj } from "@storybook/vue3";
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Types, Sizes } from "@ui/base/base-icon/types";


const meta = {
    title: 'Base/Base Icon',
    component: BaseIcon,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        type: { control: 'select', options: Object.values(Types) },
        size: { control: 'select', options: Object.values(Sizes) },
    },
    args: {
        name: 'IconArrowCircleUp',
        type: Types.ARROW,
        size: Sizes.S
    }
} satisfies Meta<typeof BaseIcon>;

export default meta;

type Story = StoryObj<typeof BaseIcon>;

const Templates: Story = {
    render: (args) => ({
        components: { BaseIcon },
        setup() { return { args } },
        template: `<Suspense><BaseIcon v-bind="args" /></Suspense>`,
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}