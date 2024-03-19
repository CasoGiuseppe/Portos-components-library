import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";

const meta = {
    title: 'Navigation/Navigation Item',
    component: NavigationItem,
    tags: ['autodocs'],
    argTypes: {
        selected: { expanded: true },
        rtl: { expanded: true },
        collapsed: { expanded: true },
        label: { control: 'text' },
    },
    args: {
        id: 0,
        icon: '',
        selected: false,
        rtl: false,
        collapsed: false,
        label: 'Label'
    }
} satisfies Meta<typeof NavigationItem>;

export default meta;

type Story = StoryObj<typeof NavigationItem>;

const Templates: Story = {
    render: (args) => ({
        components: { NavigationItem, BaseIcon },
        setup() { return { args } },
        template: `
            <section style="display: grid; gap: 10px; grid-template-columns: repeat(4, 1fr);">
                <NavigationItem v-bind="args" @click="select">
                    <template #icon>
                        <BaseIcon
                            name="IconArrowCircleRight"
                            type="arrow"
                            :size="args.collapsed ? 'L' : 'M'"
                        />
                    </template>
                    <template #children>{{ args.children }}</template>
                    <template #label>{{ args.label }}</template>
                </NavigationItem>
            </section
        `,
        methods: {
            select: action('selected'),
        },
    }),
}

export const Default: Story = {
    ...Templates,
    args: {}
}