import type { Meta, StoryObj } from "@storybook/vue3"
import BaseCheckbox from "@/components/base/base-checkbox/BaseCheckbox.vue"
import { Sizes } from "@/components/base/base-checkbox/types"
import { action } from "@storybook/addon-actions"

const meta: Meta = {
    title: "Base/Base Checkbox",
    component: BaseCheckbox,
    tags: ["autodocs"],
    argTypes: {
        id: { control: "text" },
        size: { control: "select", options: Object.values(Sizes) },
        label: { control: "text" },
        active: { control: "boolean" },
        disabled: { control: "boolean" },
        variant: { control: "boolean" },
        indeterminate: { control: "boolean" },
        invalid: { control: "boolean" }
    },
    args: {
        id: "checkboxId",
        label: "Label",
        size: Sizes.M,
        active: false,
        disabled: false,
        variant: false,
        indeterminate: false,
        invalid: false,
        // Agrega un handler para el evento 'checked' usando 'action' de Storybook
        onChecked: action("checked")
    }
} as Meta<typeof BaseCheckbox>

export default meta

type Story = StoryObj

const Templates: Story = {
    render: (args) => ({
        components: { BaseCheckbox },
        setup() {
            return { args }
        },
        template: `
      <section
        :style="{
          display: 'flex',
          gap: '10px',
          padding: '10px',
          'background-color' : args.variant === true ? '#002C5F' : 'white'
        }"
      >
        <BaseCheckbox v-bind="args">
          Label checkbox
        </BaseCheckbox>
      </section>
      `,
        methods: { action: action("checked") }
    })
}

export const Default: Story = {
    ...Templates,
    args: {}
}
