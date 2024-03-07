import type { Meta, StoryObj } from "@storybook/vue3";

import { copyToClipboard } from "../shared/helpers/";
import configuration from "./configuration";

const meta = {
    title: 'Foundations/Spacing',
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
                <ul class="
                    foundation__list
                    foundation--is-column
                    graduate
                ">
                    ${( () => section.items.map((item: Record<string, string>) => `
                        <li
                            class="
                                foundation__item
                                foundation--is-auto
                                foundation--is-row
                                foundation--is-align-center
                                foundation--is-justify-between
                                graduate-color
                            "
                            style="
                                padding: var(--spacing-40, 0) var(--spacing-40, 0) var(--${item.token}, 0);
                                background: var(--graduate-color, #000);
                            "
                            data-name="${item.token}"
                        >
                            <button
                                class="foundation__action foundation--is-order-2"
                                @click="action('${item?.copy}')"
                            >
                                copy
                            </button>
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