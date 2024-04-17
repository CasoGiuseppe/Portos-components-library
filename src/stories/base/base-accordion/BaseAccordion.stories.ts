import type { Meta, StoryObj } from "@storybook/vue3"
import BaseAccordion from "@/components/base/base-accordion/BaseAccordion.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import BaseTag from "@/components/base/base-tag/BaseTag.vue"

const meta: Meta = {
    title: "Base/Base Accordion",
    component: BaseAccordion,
    tags: ["autodocs"],
    argTypes: {
        id: { control: "text" },
        active: { control: "boolean" },
        nested: { control: "boolean" },
        title: { control: "text" },
        description: { control: "text" }
    },
    args: {
        id: "AccordionID",
        label: "Accesibility Accordion",
        active: false,
        nested: false,
        title: "First level",
        description: "Contenido Item 1"
    }
} as Meta<typeof BaseAccordion>

export default meta

type Story = StoryObj

const Template: Story = {
    render: (args) => ({
        components: { BaseAccordion, BaseIcon, BaseTag },
        setup() {
            return { args }
        },
        template: `
            <BaseAccordion v-bind="args">
            <template #title>{{ args.title }}</template>
            <template #description>{{ args.description }}</template>
            <template #nested-accordion>
                <BaseAccordion id="2" :active="false" label="accordion-2" nested>
                    <template #title>
                        Second level 1
                        <BaseTag id="tag-damage">
                            <BaseIcon
                                name="IconCalendarAdd"
                                type="calendar"
                                size="S"
                            />
                            2 Daños
                        </BaseTag>
                    </template>
                    <template #description>
                        <p>Contenido del Item 2</p>
                    </template>
                </BaseAccordion>
            </template>
        </BaseAccordion>
    `
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
