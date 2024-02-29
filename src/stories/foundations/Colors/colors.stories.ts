import type { Meta, StoryObj } from "@storybook/vue3";
import './style.scss';
import '../shared/styles/index.scss';

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
  render: (args) => ({
    setup() { return { args }},
    template: `
    ${( () => configuration.map(section => `
      <section class="foundation-colors">
          <h2 class="foundation-colors__title">
            ${section.area}
            ${section.subarea ? `: <span>${section.subarea}</span>` : ''}
          </h2>
          <ul class="foundation-colors__items">
            ${( () => section.items.map(color => `
              <li
                class="foundation-colors__item"
                data-name="${color.token}"
              >
                  <span style="background: var(--${color.token}, #000)">
                    <button @click="action('${color?.copy}')">copy</button>
                  </span>
              </li>
            `) )()
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