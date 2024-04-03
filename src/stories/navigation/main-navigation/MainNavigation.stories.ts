import type { Meta, StoryObj } from "@storybook/vue3";

import MainNavigation from '@/components/widgets/main-navigation/MainNavigation.vue';
import Logo from '@/assets/logo.svg';

const meta = {
    title: 'Navigation/Main-Navigation/Default',
    component: MainNavigation,
    tags: ['autodocs'],
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
            <MainNavigation>
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