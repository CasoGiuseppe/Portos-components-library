import type { Meta, StoryObj } from "@storybook/vue3";
import BaseInput from "@ui/base/base-input/BaseInput.vue";
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Types } from '@ui/base/base-input/types';
import { action } from '@storybook/addon-actions'

const ERRORS = {
    required: 'input value is required',
    validation: 'input validation failed'
};

const meta = {
    title: 'Base/Base Input/Password',
    component: BaseInput,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        proxyValue: { control: 'text' },
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
        input: Types.PASSWORD,
        placeholder: 'Add here your pasword',
        required: false,
        disabled: false,
        title: 'defaultTitle',
        label: 'input title',
        message: 'Help password'
    }
} satisfies Meta<typeof BaseInput>;

export default meta;

type Story = StoryObj<typeof BaseInput>;
const Templates: Story = {
    render: (args, { updateArgs }) => ({
        components: { BaseInput, BaseIcon },
        setup() { return { args } },
        template: `
            <section style="display: flex; padding: 10px; background: #eee;">
                <Suspense>
                    <BaseInput
                        v-bind="args"
                        @invalid="setInvalid"
                        @update:modelValue="update"
                        @change="change"
                        @focus="focus"
                        @send="send"
                    >
                        <template #error>{{ args.error }}</template>
                        <template #label>{{ args.label }}</template>
                        <template #message>{{ args.message }}</template>
                    </BaseInput>
                </Suspense>
            </section>
        `,
        methods: {
            setInvalid({mode, value}: {mode: string, value: string}): void {
                updateArgs({ ...args, error: value
                    ? ERRORS[mode as keyof typeof ERRORS]
                    : null })
            },
            change: action('change'),
            focus: action('focus'),
            update(value: string): void {
                updateArgs({ ...args, proxyValue: value })
            },
            send: action('send'),
        }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}