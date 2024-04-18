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
        open: { control: "boolean" },
        title: { control: "text" },
        content: { control: "text" }
    },
    args: {
        id: "AccordionID",
        label: "Accesibility Accordion",
        open: false,
        title: "First level",
        content: "details content"
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
                <template #content>{{ args.content }}</template>
                <template #nested>
                    <BaseAccordion id="2" label="accordion-2" open>
                        <template #title>
                            Second level
                            <BaseTag id="tag-damage">
                                <BaseIcon
                                    name="IconCalendarAdd"
                                    type="calendar"
                                    size="S"
                                />
                                2 Daños
                            </BaseTag>
                        </template>
                        <template #content>{{ args.content }}</template>
                    </BaseAccordion>
                    <BaseAccordion id="3" label="accordion-2">
                        <template #title>
                            Second level
                        </template>
                        <template #content>{{ args.content }}</template>
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
