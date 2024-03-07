import type { Meta, StoryObj } from "@storybook/vue3";

import { copyToClipboard } from "../shared/helpers/";
import configuration from "./configuration";

const meta = {
    title: 'Foundations/Typography',
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
            <h2 class="foundation__title">
              ${section.area}
            </h2>
            <ul class="
                foundation__list
                foundation--is-column
            ">
              ${( () => section.items.map((typo: Record<string, string>) => `
                <li
                    class="
                        foundation__item
                        foundation--is-auto
                        foundation--is-justify-between
                    "
                    data-name="${typo.token}"
                >
                    <span
                        class="
                            foundation--is-row
                            foundation--is-align-center
                            foundation--is-justify-between
                            foundation--is-full-width
                        "
                        style="background: var(--${typo.token}, #000)">
                        <p class="typography ${typo.class}" contenteditable="true">Type here to preview text</p>
                        <button
                            class="foundation__action"
                            @click="action('${typo?.copy}')"
                        >
                            copy
                        </button>
                    </span>
                </li>
              `).join(""))()
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