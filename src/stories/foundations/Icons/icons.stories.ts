import type { Meta, StoryObj } from "@storybook/vue3";
import  BaseIcon from '@ui/base/base-icon/BaseIcon.vue';
import { Sizes } from '@ui/base/base-icon/types';
import configuration from './configuration';
import { copyToClipboard } from "../shared/helpers/";

const meta = {
    title: 'Foundations/Icons',
    tags: ['autodocs'],
    args: {
      copyToClipboard: () => {},
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: () => ({
    components: { BaseIcon },
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
            ${( () => section.items.map((icon: Record<string, string>) => `
              <li class="
                foundation__item
                foundation--is-small-size
                foundation--is-center"
              >
                  <span class="
                    foundation--is-square
                    foundation--is-center
                    foundation--has-no-padding"
                    style="background: var(--color-neutral-20, #000)"
                  >
                    <BaseIcon
                      name="${icon.token}"
                      type="${section.parent}"
                      v-bind="args"
                    />
                  </span>
                  <button
                    class="foundation__action"
                    @click="action('${icon?.copy}')"
                  >copy</button>
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