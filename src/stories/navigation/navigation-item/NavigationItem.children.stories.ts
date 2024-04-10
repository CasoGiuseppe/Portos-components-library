import { type Meta, type StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';
import NavigationItem from '@/components/navigation/main/navigation-item/NavigationItem.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";


const meta = {
    title: 'Navigation/Main/Second Level',
    component: NavigationItem,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        selected: { expanded: true },
        rtl:  { control: 'radio', options: [true, false] },
        collapsed:  { control: 'radio', options: [true, false] },
        label: { control: 'text' },
        child: { control: 'text' }
    },
    args: {
        id: '',
        icon: '',
        selected: false,
        rtl: false,
        collapsed: false,
        label: 'Label',
        child: 'navigation children'
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
                    :data-hidden = "true"
                    @submit="submit"
                >
                    <template #icon>
                        <BaseIcon
                            name="IconArrowCircleRight"
                            type="arrow"
                            :size="args.collapsed ? 'M' : 'S'"
                        />
                    </template>
                    <template #label>{{ args.label }}</template>
                    <template #child>{{ args.child }}</template>
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