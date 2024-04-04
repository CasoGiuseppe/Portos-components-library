import type { Meta, StoryObj } from '@storybook/vue3';
import BaseToggle from '@/components/base/base-toggle/BaseToggle.vue';
import { Sizes } from '@/components/base/base-toggle/types';

const meta: Meta = {
    title: 'Base/Base Toggle',
    component: BaseToggle,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        size: { control: 'select', options: Object.values(Sizes) },
        active: { control: 'radio', options: [true, false] },
        disabled: { control: 'radio', options: [true, false] },
        variant: { control: 'radio', options: [true, false] },
        label: { control: 'text' },
        default: { control: 'text' }
    },

    args: {
        id: 'ToggleId',
        size: Sizes.M,
        active: false,
        disabled: false,
        variant: false,
        label: 'component label',
        default: 'Label',
      }
} as Meta<typeof BaseToggle>

export default meta

type Story = StoryObj

const Templates: Story = {
    render: (args, { updateArgs }) => ({
      components: { BaseToggle },
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
            <BaseToggle v-bind="args" @checked="action">
                {{ args.default }}
            </BaseToggle>
          </section>
      `,
        methods: {
            setActiveState(value: boolean): void {
              updateArgs({ ...args, checked: value })
            }
        }
    })
  }
  
  export const Default: Story = {
    ...Templates,
    args: {}
  }