import type { Meta, StoryObj } from "@storybook/vue3"
import BaseAccordion from "@/components/base/base-accordion/BaseAccordion.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"

const meta: Meta = {
    title: "Base/Base Accordion",
    component: BaseAccordion,
    tags: ["autodocs"],
    argTypes: {
        id: { control: "text" },
        active: { control: "boolean" },
        title: { control: "text" },
        content: { control: "text" }
    },
    args: {
        id: "AccordionID",
        label: 'Accesibility Accordion',
        active: false,
        title: "Item 1",
        content: "Contenido Item 1",
    }
} as Meta<typeof BaseAccordion>

export default meta

type Story = StoryObj

const Template: Story = {
    render: (args, { updateArgs }) => ({
        components: { BaseAccordion, BaseIcon },
        setup() {
            return { args }
        },
        template: `
        <div
            style="
                margin: 30px 50px;
                border: 1px solid var(--color-neutral-40, #000);
                border-radius: var(--radius-300, 0);
            "
        >
            <BaseAccordion v-bind="args" @checked="setActiveState">
                <template #title>{{ args.title }}</template>
                <template #content>{{ args.content }}</template>
            </BaseAccordion>
            <BaseAccordion id="2" :active="true" label="accordion-2">
                <template #title>Item 2</template>
                <template #content>
                    <p>Contenido del Item 2</p>
                </template>
            </BaseAccordion>
        </div>
    `,
        methods: {
            setActiveState(value: boolean): void {
                updateArgs({ ...args, status: value })
            }
        }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
