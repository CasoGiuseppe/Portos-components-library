import type { Meta, StoryObj } from "@storybook/vue3";

import configuration from './configuration';
import { copyToClipboard } from "../shared/helpers/";

const meta = {
    title: 'Foundations/Colors',
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
          <h2
            class="foundation__title"
            data-subarea="${section.subarea ? `: ${section.subarea}` : ''}"
          >
            ${section.area}
          </h2>
          <ul class="foundation__list">
            ${( () => section.items.map((color: Record<string, string>) => `
              <li
                class="foundation__item"
                data-name="${color.token}"
              >
                  <span
                    class="foundation--is-square"
                    style="background: var(--${color.token}, #000)">
                    <button
                      class="foundation__action"
                      @click="action('${color?.copy}')"
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