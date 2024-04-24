import type { Meta, StoryObj } from "@storybook/vue3"
import ModalDialog from "@/components/tools/modal-panel/ModalPanel.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import BaseLink from "@/components/base/base-link/BaseLink.vue"
import { Sizes } from "@/components/tools/modal-panel/types";

const meta: Meta<typeof ModalDialog> = {
    title: "Modal/Narrow",
    component: ModalDialog,
    tags: ["autodocs"],
    argTypes: {
        id: {control: "text"},
        size: { control: "select", options: Object.values(Sizes) },
        isDrawer: { control: 'radio', options: [true, false] },
        header: { control: "text" },
        default: { control: "text" },
        footer: { control: "text" }
    },
    args: {
        id: "modalID",
        size: Sizes.NARROW,
        isDrawer: false,
        header: "Modal title",
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
}

export default meta
type Story = StoryObj<typeof ModalDialog>

const Template: Story = {
    render: (args) => ({
        components: { ModalDialog, BaseButton, BaseIcon, BaseLink },
        setup() {
          return { args }
        },
        template: `
      <div>
        <ModalDialog v-bind="args">
          <template #header>
            <BaseIcon
                :id="'TitleIcon'"
                type="calendar"
                :name="'IconCalendarCalendar'"
            ></BaseIcon> {{ args.header }}
          </template>
          {{ args.default }}
          <template #footer>
            <BaseLink id="link" size="M">
              <BaseIcon name="IconArrowCircleRight" type="arrow" size="M"/>
              Link
            </BaseLink>
            <BaseButton size="M">
              <BaseIcon name="IconArrowCircleRight" type="arrow" size="S"/>
              Action
            </BaseButton>
          </template>
        </ModalDialog>
      </div>
    `
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
