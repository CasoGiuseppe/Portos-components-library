import type { Meta, StoryObj } from "@storybook/vue3";
import  IconAsync from '@ui/base/base-icon/BaseIcon.vue';
import configuration from './configuration';


const meta = {
    title: 'Foundations/Icons',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: () => ({
    components: { IconAsync },
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
              <li class="foundation__item foundation--is-small-size">
                  <span class="
                    foundation--is-square
                    foundation--is-center
                    foundation--has-no-padding"
                  >
                    <IconAsync name="${icon.token}" type="${section.parent}" />
                  </span>
              </li>
            `))()
            }
          </ul>
      </section>
    `))()}`
  })
}

export const Default: Story = {
    ...Template,
    args: {}
  }