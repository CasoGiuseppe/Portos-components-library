import type { Meta, StoryObj } from "@storybook/vue3"
import BaseCheckbox from "@/components/base/base-checkbox/BaseCheckbox.vue"
import { Sizes, Types } from "@/components/base/base-checkbox/types"
import { action } from "@storybook/addon-actions"

const meta: Meta = {
    title: "Base/Base Checkbox",
    component: BaseCheckbox,
    tags: ["autodocs"],
    argTypes: {
        id: { control: "text" },
        status: { control: "select", options: Object.values(Types) }, // Cambiado de 'type' a 'status' para coincidir con el componente Vue
        size: { control: "select", options: Object.values(Sizes) },
        label: { control: "text" },
        active: { control: "boolean" },
        disabled: { control: "boolean" },
        variant: { control: "boolean" },
        indeterminate: { control: "boolean" }
    },
    args: {
        id: "checkboxId",
        label: "Label",
        size: Sizes.M,
        status: Types.DEFAULT,
        active: false,
        disabled: false,
        variant: false,
        indeterminate: false,
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
export const ErrorState: Story = {
    ...Templates,
    args: {
        ...meta.args,
        status: Types.ERROR,
        label: "Error State"
    }
}

export const WithVariant: Story = {
    ...Templates,
    args: {
        ...meta.args,
        variant: true,
        label: "Variant Checkbox"
    }
}
