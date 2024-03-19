import type { Meta, StoryObj } from "@storybook/vue3";
import  BaseIcon from '@ui/base/base-icon/BaseIcon.vue';
import { Sizes } from '@ui/base/base-icon/types';
import configuration from './configuration';

const meta = {
    title: 'Base/Base Icon',
    tags: ['autodocs'],
    argTypes: {
      size: { control: 'select', options: Object.values(Sizes) },
    },
    args: {
      size: Sizes.S
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => ({
    components: { BaseIcon },
    setup() { return { args } },
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
                    <Suspense>
                      <BaseIcon
                        id="${icon.token}"
                        name="${icon.token}"
                        type="${section.parent}"
                        :size="args.size"
                      />
                    </Suspense>
                  </span>
              </li>
            `).join(""))()
            }
          </ul>
      </section>
    `).join(""))()}`,
  })
}

export const Default: Story = {
    ...Template,
    args: {}
  }