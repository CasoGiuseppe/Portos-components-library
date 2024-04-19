import type { Meta, StoryObj } from "@storybook/vue3"
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"

const meta: Meta = {
    title: "Base/BaseRadio",
    component: BaseRadio,
    argTypes: {
        id: { control: "text" },
        name: { control: "text" },
        disabled: { control: "boolean" },
        modelValue: { control: "text" },
        options: {
            control: "object",
            description:
                "Array of objects with label and value and optionally disabled state"
        }
    },
    args: {
        id: "radio-group-1",
        name: "exampleGroup",
        disabled: false,
        modelValue: "",
        options: [
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2", disabled: false },
            { label: "Option 3", value: "3", disabled: true }
        ]
    }
} as Meta<typeof BaseRadio>

export default meta

type Story = StoryObj<typeof BaseRadio>

const Template: Story = {
    render: (args) => ({
        components: { BaseRadio },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 20px">
                <BaseRadio v-bind="args">
                    <template #legend>{{ args.legendContent }}</template>
                </BaseRadio>
            </div>
        `
    })
}

export const Default: Story = {
    ...Template,
    args: {
        // default args can be modified here if needed
    }
}

export const WithLegend: Story = {
    ...Template,
    args: {
        ...meta.args,
        legendContent: "Example Radio Group"
    }
}

export const Disabled: Story = {
    ...Template,
    args: {
        ...meta.args,
        disabled: true
    }
}
