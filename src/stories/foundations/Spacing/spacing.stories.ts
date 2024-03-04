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
        <section class="foundation">
            <ul class="
                foundation__list
                foundation--is-column
                graduate
            ">
                ${(() => configuration.map((section: Record<string, any>) => `
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
                            padding: var(--spacing-40, 0) var(--spacing-40, 0) var(--${section.token}, 0);
                            background: var(--graduate-color, #000);
                        "
                        data-name="${section.token}"
                    >
                        <button
                            class="foundation__action foundation--is-order-2"
                            @click="action('${section?.copy}')"
                        >
                            copy
                        </button>
                    </li>`))()
                }
            </ul>
        </section>
      `,
      methods: { action: copyToClipboard }
    })
  }
  
  export const Default: Story = {
      ...Template,
      args: {}
    }