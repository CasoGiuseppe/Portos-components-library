import type { Meta, StoryObj } from "@storybook/vue3";
import BaseButton from "@ui/base/base-button/BaseButton.vue";
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Sizes, Types } from '@ui/base/base-button/types';
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
        variant: { control: 'radio', options: [true, false] },
        disabled: { control: 'radio', options: [true, false] },
        default: { control: 'text' }
    },
    args: {
        id: 'defaultID',
        label: 'button aria title',
        type: Types.PRIMARY,
        size: Sizes.L,
        disabled: false,
        variant: false,
        default: 'Button label',
      }
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof BaseButton>;

const Templates: Story = {
    render: (args) => ({
        components: { BaseButton, BaseIcon },
        setup() { return { args } },
        template: `
            <section
                :style="{
                    'display' : 'flex',
                    'gap' : '10px',
                    'padding' : '10px',
                    'background-color' : args.variant === true ? '#002C5F' : 'white'
                }"
            >
                    <BaseButton v-bind="args" @send="action">
                        <template #default>{{ args.default }}</template>
                    </BaseButton>

                    <BaseButton v-bind="args" @send="action">
                        <template #default>
                            {{ args.default }}
                            <Suspense>
                                <BaseIcon name="IconArrowCircleRight" type="arrow" size="S"/>
                            </Suspense>
                        </template>
                    </BaseButton>
            </section>
        `,
        methods: { action: action('submitted') }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}