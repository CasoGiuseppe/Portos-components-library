import type { Meta, StoryObj } from "@storybook/vue3"
import { action } from "@storybook/addon-actions"
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"
import { UIRadioDirection, Sizes } from "@/components/base/base-radio/types" // Assuming the path is correct

const meta = {
    title: "Base/Base Radio",
    component: BaseRadio,
    argTypes: {
        id: { control: "text" },
        name: { control: "text" },
        disabled: { control: "boolean" },
        modelValue: { control: "text" },
        options: {
            control: "object",
            description:
                "Array of objects with label, value, and optionally disabled state"
        },
        direction: {
            control: "radio",
            options: [UIRadioDirection.ROW, UIRadioDirection.COLUMN],
            description: "Layout direction of the radio buttons"
        },
        size: {
            control: "radio",
            options: [Sizes.M, Sizes.S],
            description: "Size of the radio buttons"
        },
        variant: { control: "boolean" }
    }
} satisfies Meta<typeof BaseRadio>

export default meta

type Story = StoryObj<typeof BaseRadio>

const Template: Story = {
    render: (args) => ({
        components: { BaseRadio },
        setup() {
            const onSelectionChanged = action("update:modelValue")
            return { args, onSelectionChanged }
        },
        template: `
        <div style="padding: 20px">
            <BaseRadio v-bind="args" @update:modelValue="onSelectionChanged" />
        </div>
    `
    })
}

export const Default: Story = {
    ...Template,
    args: {
        id: "default-radio-group",
        name: "defaultGroup",
        disabled: false,
        modelValue: "",
        options: [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3", disabled: true }
        ],
        direction: UIRadioDirection.COLUMN,
        size: Sizes.M,
        variant: false
    }
}
