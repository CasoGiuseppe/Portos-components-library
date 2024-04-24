import type { Meta, StoryObj } from "@storybook/vue3"
import NavigationContextualToolbar from "@/components/navigation/contextual/navigation-contextual-toolbar/NavigationContextualToolbar.vue"

import { action } from "@storybook/addon-actions"

const meta: Meta = {
    title: "Navigation/Navigation Contextual Toolbar",
    component: NavigationContextualToolbar,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text" }
    },
    args: {
        title: "navigation title"
    }
} as Meta<typeof NavigationContextualToolbar>

export default meta

type Story = StoryObj<typeof NavigationContextualToolbar>

const Template: Story = {
    render: (args) => ({
        components: { NavigationContextualToolbar },
        setup() {
            return { args }
        },
        template: `
        <section style="heigth: 100vh;">
          <NavigationContextualToolbar :title="args.title">
          <ul style="width: 150px; text-align: center;">
            <li style="padding: 0.5rem 1rem;">lista 1</li>
            <li style="padding: 0.5rem 1rem; border-top: 1px solid lightgrey; border-bottom: 1px solid lightgrey;">lista 2</li>
            <li style="padding: 0.5rem 1rem;">lista 3</li>
          </ul>
          </NavigationContextualToolbar>
                   
        </section>
        `,
        methods: {
            handleClose: action("close"),
            action: action("clicked")
        }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
