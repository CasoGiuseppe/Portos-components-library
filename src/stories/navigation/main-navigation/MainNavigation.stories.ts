import type { Meta, StoryObj } from "@storybook/vue3";

import MainNavigation from '@/components/widgets/main-navigation/MainNavigation.vue';
import Logo from '@/assets/images/logo.png';

const meta = {
    title: 'Widgets/Navigation/Main',
    component: MainNavigation,
    tags: ['autodocs']
} satisfies Meta<typeof MainNavigation>;

export default meta;

type Story = StoryObj<typeof MainNavigation>;

const Templates: Story = {
    render: (args) => ({
        components: { MainNavigation },
        setup() { return {
            args,
            logo: Logo
        } },
        template: `
            <MainNavigation v-bind="args">
                <template #logo>
                    <img :src="logo" />
                </template>
            </MainNavigation>
        `,
    }),
}

export const Default: Story = {
    ...Templates,
    args: {}
}