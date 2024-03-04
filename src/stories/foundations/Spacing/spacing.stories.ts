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
    render: (args) => ({
      template: `
        <section class="foundation">
            <ul class="foundation__list foundation--is-column">
                ${(() => configuration.map(space => `
                    <li
                        class="
                            foundation__item
                            foundation--is-auto
                            foundation--is-row
                            foundation--is-align-center
                            foundation--is-justify-between
                        "
                        style="
                            padding-bottom: var(--${space.token}, 0);
                            background: var(--${space?.background}, #000);
                        "
                        data-name="${space.token}"
                    >
                        <button
                            class="foundation__action foundation--is-order-2"
                            @click="action('${space?.copy}')"
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