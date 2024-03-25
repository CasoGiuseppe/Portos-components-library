import type { Meta, StoryObj } from "@storybook/vue3";
import BaseToggle from "@ui/base/base-toggle/BaseToggle.vue";
import { Sizes, Types } from '@ui/base/base-toggle/types';
import { action } from '@storybook/addon-actions'

const meta = {
    title: 'Base/Base Toggle',
    component: BaseToggle,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        label: { control: 'text' },
        type: { control: 'select', options: Object.values(Types) },
        size: { control: 'select', options: Object.values(Sizes) },
        marked: { control: 'radio', options: [true, false] },
        focus: { control: 'radio', options: [true, false] },
        disabled: { control: 'radio', options: [true, false] },
    },
    args: {
        id: 'toggleID',
        type: Types.PRIMARY,
        size: Sizes.M,
        disabled: false,
        marked: false,
        label:'Lorem Ipsum',
        focus: false, 
      }

} satisfies Meta<typeof BaseToggle>;

export default meta;

type Story = StoryObj<typeof BaseToggle>;

const Templates: Story = {
    render: (args) => ({
        components: { BaseToggle },
        setup() { return { args } },
        template: `
        <section style="display: flex; gap: 10px;">
                <BaseToggle v-bind="args" @submit="action">
                    <template class="toggle"><div class="toggle-ball"><input type="radius"/></div></template>
                </BaseToggle>
        </section>
        `,
        methods: { action: action('submitted') }
    }),
}

export const Default: Story = {
    ...Templates,
    args: {},
}