import type { Meta, StoryObj } from '@storybook/vue3';
import BaseLink from '@/components/base/base-link/BaseLink.vue';
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue";
import { Element, Sizes, Types } from '@/components/base/base-link/types';
import { action } from '@storybook/addon-actions'

const meta: Meta = {
  title: 'Base/Base Link',
  component: BaseLink,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    type: { control: 'select', options: Object.values(Types) },
    size: { control: 'select', options: Object.values(Sizes) },
    elementType: { control: 'select', options: Object.values(Element) },
    href: { if: { arg: 'elementType', eq: Element.ANCHOR }, control: 'text'},
    default: { control: 'text' }
  },
  
  args: {
    id: 'linkId',
    label: 'Accesibility Link',
    size: Sizes.M,
    type: Types.PRIMARY,
    variant: false,
    disabled: false,
    default: 'Base Link',
    elementType: Element.BUTTON,
    href: 'https://amaris.com/'
  }
} as Meta<typeof BaseLink>

export default meta

type Story = StoryObj

const Templates: Story = {
  render: (args) => ({
    components: { BaseLink, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <section
          :style="{
              'display' : 'flex',
              'gap' : '10px',
              'padding' : '10px',
              'background-color' : args.variant === true ? '#002C5F' : 'white'
          }"
      >
          <BaseLink v-bind="args" @send="action">{{ args.default }}</BaseLink>

          <BaseLink v-bind="args" @send="action">
              {{ args.default }}
              <Suspense>
                <BaseIcon name="IconArrowCircleRight" type="arrow" size="M"/>
              </Suspense>
          </BaseLink>
        </section>
    `,
    methods: { action: action('submitted') }
  })
}

export const Default: Story = {
  ...Templates,
  args: {}
}
