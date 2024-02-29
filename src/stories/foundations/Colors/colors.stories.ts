import type { Meta, StoryObj } from "@storybook/vue3";
import './style.scss';
import '../shared/styles/index.scss';

import configuration from './configuration';

const meta = {
    title: 'Foundations/Colors',
    args: {}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: () => ({
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
                        <button>copy</button>
                      </span>
                  </li>
                `) )()
                }
              </ul>
          </section>
        `) )()}`
    })
  }

export const Default: Story = {
    ...Template,
    args: {}
  }