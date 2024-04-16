import { ref } from "vue"
import type { Meta, StoryObj } from "@storybook/vue3"
import ModalDialog from "@/components/modal/ModalDialog.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"

const meta: Meta<typeof ModalDialog> = {
    title: "Modal/ModalDialog",
    component: ModalDialog,
    tags: ["autodocs"],
    argTypes: {
        size: { control: "select", options: ["narrow", "wide"] }
    },
    args: {
        size: "narrow"
    },
    subcomponents: { BaseIcon }
}

export default meta
type Story = StoryObj<typeof ModalDialog>

const Template: Story = {
    render: (args) => ({
        components: { ModalDialog, BaseButton, BaseIcon },
        setup() {
            const isOpen = ref(false)

            const toggleModal = () => {
                isOpen.value = !isOpen.value
            }
            const closeModal = () => {
                isOpen.value = false
            }
            return { args, isOpen, toggleModal, closeModal }
        },
        template: `
      <div>
        <BaseButton type="secondary" @click="toggleModal">Toogle Modal</BaseButton>
       
        <ModalDialog :is-Open="isOpen" :id="'modal-3234'" :size="args.size" @close="closeModal">
          <template #header>
          <BaseIcon
          :id="'TitleIcon'"
          type="calendar"
          :name="'IconCalendarCalendar'"
          style="margin-right: 0.5rem"
      ></BaseIcon> {{ args.headerText || 'This is the modal header' }}
          </template>
          <template #default>
            <div class="modal-dialog__body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <footer class="modal-dialog__footer">
              <BaseButton @click="onAction1" type="tertiary" style="margin-right: 10px;">Do something!</BaseButton>
              <BaseButton @click="closeModal">Dismiss</BaseButton>
            </footer>
          </template>
        </ModalDialog>
      </div>
    `,
        methods: {
            onAction1: () => alert("this is an action 1")
        }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}
