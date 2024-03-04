import type { Meta, StoryObj } from "@storybook/vue3";
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
                <ul
                    class="
                        foundation__list
                        ${section?.mode === 'positive' ? 'foundation--has-positive-font' : null}
                    "
                    style="background: ${section.background ?? null}"
                >
                    ${( () => section.items.map(item => `
                        <li
                            class="foundation__item"
                            data-name="${item?.token}"
                        >
                            <span
                                style="
                                    background: var(--${item?.background}, #000);
                                    box-shadow: var(--${item?.token})
                                "
                            >
                                <button
                                    class="foundation__action"
                                    @click="action('${item?.copy}')"
                                >copy</button>
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