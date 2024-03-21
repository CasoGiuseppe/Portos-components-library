import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";

const meta = {
    title: 'Navigation/Item/Default',
    component: NavigationItem,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        selected: { expanded: true },
        rtl:  { control: 'radio', options: [true, false] },
        collapsed:  { control: 'radio', options: [true, false] },
        label: { control: 'text' },
    },
    args: {
        id: '0',
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
                <NavigationItem
                    v-bind="args"
                    @submit="submit"
                    @action="action"
                >
                    <template #icon>
                        <Suspense>
                            <BaseIcon
                                name="IconArrowCircleRight"
                                type="arrow"
                                :size="args.collapsed ? 'M' : 'S'"
                            />
                        </Suspense>
                    </template>
                    <template #label>{{ args.label }}</template>
                </NavigationItem>
            </section
        `,
        methods: {
            submit: action('selected'),
            action: action('action work'),
        },
    }),
}

export const Default: Story = {
    ...Templates,
    args: {}
}