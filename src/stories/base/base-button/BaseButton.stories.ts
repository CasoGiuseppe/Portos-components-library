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
        active: { if: { arg: 'type', eq: 'dropdown' }, control: 'radio', options: [true, false] },
        fullSize: { control: 'radio', options: [true, false] },
        default: { control: 'text' },
        error: { if: { arg: 'type', eq: 'dropdown' }, control: 'text'}
    },
    args: {
        id: 'defaultID',
        label: 'button aria title',
        type: Types.PRIMARY,
        size: Sizes.L,
        disabled: false,
        variant: false,
        active: false,
        fullSize: false,
        default: 'Select your option',
        error: 'error'
      }
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof BaseButton>;

const Templates: Story = {
    render: (args, { updateArgs }) => ({
        components: { BaseButton, BaseIcon },
        setup() { return { args } },
        template: `
            <section
                :style="{
                    'display' : 'flex',
                    'gap' : '10px',
                    'padding' : '10px',
                    'max-width' : '100%',
                    'background-color' : (
                        args.variant === true &&
                        args.type !== 'dropdown' &&
                        args.type !== 'backToTop'
                    ) ? '#002C5F' : 'white'
                }"
            >
                <template v-if="args.type === 'primary' || args.type === 'secondary' || args.type === 'tertiary'">
                    <BaseButton v-bind="args" @send="action">
                        <template #default>{{ args.default }}</template>
                    </BaseButton>

                    <BaseButton v-bind="args" @send="action">
                        <template #default>
                            {{ args.default }}
                            <BaseIcon name="IconArrowCircleRight" type="arrow" size="S"/>
                        </template>
                    </BaseButton>
                </template>

                <template v-if="args.type === 'backToTop'">
                    <BaseButton v-bind="args" type='backToTop' @send="action">
                        <template #default>
                            {{ args.default }}
                            <BaseIcon name="IconArrowUpMD" type="arrow" size="S"/>
                        </template>
                    </BaseButton>
                </template>

                <template v-if="args.type === 'dropdown'">
                    <BaseButton v-bind="args" type="dropdown" @send="setActiveState">
                        <template #default>
                            {{ args.default }}
                        </template>
                        <template v-if="args.error !== ''" #error>{{ args.error }}</template>
                    </BaseButton>
                </template>
            </section>
        `,
        methods: {
            action: action('submitted'),
            setActiveState(): void {
                updateArgs({ ...args, active: !args.active })
            }
        }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}