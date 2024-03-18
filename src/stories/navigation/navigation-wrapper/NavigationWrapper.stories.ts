import type { Meta, StoryObj } from "@storybook/vue3";
import { action } from '@storybook/addon-actions';

import NavigationWrapper from '@/components/navigation/navigation-wrapper/NavigationWrapper.vue';
import NavigationItem from "@/components/navigation/navigation-item/NavigationItem.vue";
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Types, Sizes } from "@/components/base/base-icon/types";
import { type INavigationItem } from "@/components/navigation/navigation-item/types";

const meta = {
    title: 'Navigation/Navigation Wrapper',
    component: NavigationWrapper,
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    }
} satisfies Meta<typeof NavigationWrapper>;

export default meta;

type Story = StoryObj<typeof NavigationWrapper>;

const Templates: Story = {
    render: (args) => ({
        components: { NavigationWrapper, NavigationItem, BaseIcon },
        setup() {
            const navigation: INavigationItem[] = [
                {
                    label: 'Label 1',
                    icon: 'IconArrowCircleRight',
                    type: Types.ARROW,
                    link: 'https://google.com',
                },
                {
                    label: 'Label 2',
                    icon: 'IconArrowCircleRight',
                    type: Types.ARROW,
                    link: 'https://youtube.com',
                    children: [
                        {
                            label: 'Children 1',
                            icon: 'IconArrowCircleRight',
                            type: Types.ARROW,
                            link: 'https://youtube.com',
                        }
                    ]
                },
                {
                    label: 'Label 3',
                    icon: 'IconArrowCircleRight',
                    type: Types.ARROW,
                    link: 'https://google.com',
                },
                {
                    label: 'Label 2',
                    icon: 'IconArrowCircleRight',
                    type: Types.ARROW,
                    link: 'https://youtube.com',
                    children: [
                        {
                            label: 'Children 1',
                            icon: 'IconArrowCircleRight',
                            type: Types.ARROW,
                            link: 'https://youtube.com',
                        }
                    ]
                },
            ]
            return {
                args,
                navigation,
                Sizes
            }
        },
        template: `
            <section style="display: grid; gap: 10px; grid-template-columns: repeat(4, 1fr);">
                <NavigationWrapper />
                <NavigationWrapper inversed />
                <NavigationWrapper collapsed />
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