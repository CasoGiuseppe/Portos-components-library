import type { Meta, StoryObj } from "@storybook/vue3";
import './style.scss';
import { copyToClipboard } from "../shared/helpers/";

import configuration from './configuration';

const meta = {
    title: 'Foundations/Elevations',
    argTypes: {
      copyToClipboard: () => {},
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: (args) => ({
        template: `
        ${( () => configuration.map(section => `
            <section class="foundation">
                <h2 class="foundation__title">${section.type}</h2>
                <ul class="foundation__list">
                    ${( () => section.items.map(item => `
                        <li
                            class="foundation__item foundation__item--extra-space"
                            data-name="${item?.token}"
                        >
                            <span
                                style="background: var(--color-primary-10, #000)"
                                class="${item?.token}"
                            >
                                <button @click="action('${item?.copy}')">copy</button>
                            </span>
                        </li>`) )()
                    }
                </ul>
            </section>
        `) )()}`,
        methods: { action: copyToClipboard }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}