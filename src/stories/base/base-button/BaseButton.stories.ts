import type { Meta, StoryObj } from "@storybook/vue3";
import BaseButton from "@ui/base/base-button/BaseButton.vue";
import { Sizes, Types, Variants } from '@ui/base/base-button/types';
import { action } from '@storybook/addon-actions'

const meta = {
    title: 'Base/Base Button',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        label: { control: 'text' },
        type: { control: 'select', options: Object.values(Types) },
        size: { control: 'select', options: Object.values(Sizes) },
        variant: { control: 'radio', options: ['ALT', null] },
        disabled: { control: 'radio', options: [true, false] },
        default: { control: 'text' }
    },
    args: {
        id: 'defaultID',
        label: 'button aria title',
        type: Types.PRIMARY,
        size: Sizes.L,
        disabled: false,
        default: 'Button label',
      }
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof BaseButton>;

const Templates: Story = {
    render: (args) => ({
        components: { BaseButton },
        setup() { return { args } },
        template: `
            <BaseButton v-bind="args" @click="action">
                <template #default>{{ args.default }}</template>
            </BaseButton>
        `,
        methods: { action: action('clicked') }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}