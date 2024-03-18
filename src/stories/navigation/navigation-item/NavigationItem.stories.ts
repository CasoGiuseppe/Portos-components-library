import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";

const meta = {
    title: 'Navigation/Navigation Item',
    component: NavigationItem,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        selected: { expanded: true },
        inversed: { expanded: true },
        collapsed: { expanded: true },
        children: {
            control: 'check',
            options: ['Add Children'],
          },
    },
    args: {
        id: 0,
        icon: '',
        label: 'Label',
        selected: false,
        inversed: false,
        collapsed: false,
        children: []
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
                </NavigationItem>

                <NavigationItem
                    label="Selected"
                    selected
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconCalendarCalendar"
                            type="calendar"
                            size="M"
                        />
                    </template>
                </NavigationItem>

                <NavigationItem
                    label="التسمية"
                    inversed
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconCommunicationChatDots"
                            type="communication"
                            size="M"
                        />
                    </template>
                </NavigationItem>

                <NavigationItem
                    label="Submenu"
                    :children="[1]"
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconEditAddMinusSquare"
                            type="edit"
                            size="M"
                        />
                    </template>
                </NavigationItem>
            </section>

            <section style="display: grid; gap: 10px; grid-template-columns: repeat(8, 1fr); margin-top: 10px">
                <NavigationItem
                    label="Collapsed"
                    collapsed
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconEditAddMinusSquare"
                            type="edit"
                            size="L"
                        />
                    </template>
                </NavigationItem>

                <NavigationItem
                    label="Collapsed"
                    collapsed
                    selected
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconEditAddMinusSquare"
                            type="edit"
                            size="L"
                        />
                    </template>
                </NavigationItem>

                <NavigationItem
                    label="Collapsed Submenu"
                    collapsed
                    :children="[1]"
                    @click="select"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconEditAddMinusSquare"
                            type="edit"
                            size="L"
                        />
                    </template>
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