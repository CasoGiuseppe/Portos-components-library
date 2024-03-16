import type { Meta, StoryObj } from "@storybook/vue3";
import BaseInput from "@ui/base/base-input/BaseInput.vue";
import { Types } from '@ui/base/base-input/types';
import { action } from '@storybook/addon-actions'

const meta = {
    title: 'Base/Base Input',
    component: BaseInput,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        modelValue: { control: 'text' },
        input: { control: 'select', options: Object.values(Types) },
        placeholder: { control: 'text' },
        required: { control: 'radio', options: [true, false] },
        disabled: { control: 'radio', options: [true, false] },
        pattern: { control: 'text' },
        accept: { control: 'text' },
        maxLength: { control: 'number' },
        title: { control: 'text' },
        label: { control: 'text' },
        message: { control: 'text' },
        error: { control: 'text' }
    },
    args: {
        id: 'fieldID',
        input: Types.TEXT,
        placeholder: 'Add here your text',
        required: false,
        disabled: false,
        pattern: '^[a-zA-Z0-9]+$',
        accept: 'image/*',
        maxLength: 5,
        title: 'defaultTitle',
        label: 'input title',
        message: 'Allowed: letters, numbers at least 5 characters'
    }
} satisfies Meta<typeof BaseInput>;

export default meta;

type Story = StoryObj<typeof BaseInput>;

const Templates: Story = {
    render: (args, { updateArgs }) => ({
        components: { BaseInput },
        setup() { return { args } },
        template: `
            <section style="display: flex; padding: 10px; background: #eee;">
                <BaseInput
                    v-bind="args"
                    @invalid="setInvalid"
                    @update:modelValue="update"
                    @change="change"
                    @focus="focus"
                >
                    <template #error>{{ args.error }}</template>
                    <template #label>{{ args.label }}</template>
                    <template #message>{{ args.message }}</template>
                </BaseInput>
            </section>
        `,
        methods: {
            setInvalid(value: string) {
                updateArgs({ ...args, error: value ? 'input validation failed' : null })
            },
            update: action('update'),
            change: action('change'),
            focus: action('focus')
        }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}