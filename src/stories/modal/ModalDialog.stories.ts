import type { Meta, StoryObj } from "@storybook/vue3"
import ModalDialog from "@/components/tools/modal/Modal.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import { Sizes } from "@/components/tools/modal/types";

const meta: Meta<typeof ModalDialog> = {
    title: "Modal/ModalDialog",
    component: ModalDialog,
    tags: ["autodocs"],
    argTypes: {
        id: {control: "text"},
        size: { control: "select", options: Object.values(Sizes) },
        active: { control: 'radio', options: [true, false] },
        isPanel: { control: 'radio', options: [true, false] },
        header: { control: "text" },
        default: { control: "text" },
        footer: { control: "text" }
    },
    args: {
        id: "modalID",
        size: Sizes.NARROW,
        active: false,
        isPanel: false,
        header: "Modal title",
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
}

export default meta
type Story = StoryObj<typeof ModalDialog>

const Template: Story = {
    render: (args, { updateArgs }) => ({
        components: { ModalDialog, BaseButton, BaseIcon },
        setup() {
          return { args }
        },
        template: `
      <div>
        <BaseButton
          type="secondary"
          @click="setAOpenState"
        >Toogle Modal</BaseButton>
       
        <ModalDialog 
          v-bind="args"
          @close="closeModal"
          @open="openModal"
        >
          <template #header>
            <BaseIcon
                :id="'TitleIcon'"
                type="calendar"
                :name="'IconCalendarCalendar'"
            ></BaseIcon> {{ args.header }}
          </template>
          {{ args.default }}
          <template #footer>
            <BaseButton @click="closeModal">Close</BaseButton><BaseButton @click="onAction1" type="tertiary" style="margin-right: 10px;">Do something!</BaseButton>
            <BaseButton @click="closeModal">Dismiss</BaseButton>
          </template>
        </ModalDialog>
      </div>
    `,
        methods: {
            onAction1: () => alert("this is an action 1"),
            openModal(): void { updateArgs({ ...args, active: true }) },
            closeModal(): void { updateArgs({ ...args, active: false }) },
            setAOpenState(): void { updateArgs({ ...args, active: !args.active }) }
        }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
