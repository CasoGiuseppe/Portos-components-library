import type { Meta, StoryObj } from "@storybook/vue3";
import { copyToClipboard } from "../shared/helpers";

import configuration from './configuration';

const meta = {
    title: 'Foundations/Radius',
    argTypes: {
      copyToClipboard: () => {},
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: () => ({
        template: `
        ${( () => configuration.map((section: Record<string, any>) => `
            <section class="foundation">
                <h2 class="foundation__title">${section.type}</h2>
                <ul
                    class="
                        foundation__list
                        graduate
                    "
                >
                    ${( () => section.items.map((item: Record<string, string>) => `
                        <li
                            class="foundation__item graduate-color"
                            data-name="${item?.token}"
                        >
                            <span
                                class="foundation--is-square"
                                style="
                                    background: var(--graduate-color, #000);
                                    border-radius: var(--${item?.token})
                                "
                            >
                                <button
                                    class="foundation__action"
                                    @click="action('${item?.copy}')"
                                >copy</button>
                            </span>
                        </li>`).join(""))()
                    }
                </ul>
            </section>
        `).join(""))()}`,
        methods: { action: copyToClipboard }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}