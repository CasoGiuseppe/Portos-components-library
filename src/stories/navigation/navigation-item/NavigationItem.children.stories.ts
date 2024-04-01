import { setup, type Meta, type StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';
import ClickOutside from "@ui/utilities/directives/clickOutside";
import NavigationItem from '@/components/navigation/main/navigation-item/NavigationItem.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";

setup((app) => app.directive('click-outside', ClickOutside));

const meta = {
    title: 'Navigation/Item/Second Level',
    component: NavigationItem,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        selected: { expanded: true },
        rtl:  { control: 'radio', options: [true, false] },
        collapsed:  { control: 'radio', options: [true, false] },
        label: { control: 'text' },
        children: { control: 'text' }
    },
    args: {
        id: '',
        icon: '',
        selected: false,
        rtl: false,
        collapsed: false,
        label: 'Label',
        children: 'navigation children'
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
                    <template #children>{{ args.children }}</template>
                </NavigationItem>
            </section
        `,
        methods: {
            submit: action('selected'),
        },
    }),
}

export const Default: Story = {
    ...Templates,
    args: {}
}