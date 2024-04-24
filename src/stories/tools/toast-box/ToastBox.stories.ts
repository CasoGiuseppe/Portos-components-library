import type { Meta, StoryObj } from "@storybook/vue3"
import ToastBox from "@/components/tools/toast-box/ToastBox.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import { Type } from "@/components/tools/toast-box/types"
import {
    Types as IconTypes,
    Sizes as IconSizes
} from "@/components/base/base-icon/types"
import {
    Types as ButtonTypes,
    Sizes as ButtonSizes
} from "@/components/base/base-button/types"
import { action } from "@storybook/addon-actions"

const meta: Meta = {
    title: "Tools/ToastBox",
    component: ToastBox,
    tags: ['autodocs'],
    argTypes: {
        id: { control: "text" },
        type: { control: "select", options: Object.values(Type) },
        countDown: { control: 'object'},
        allowClose: { control: 'radio', options: [true, false] },
        tag: { control: "select", options: { dialog: "dialog", aside: "aside" } },
        title: { control: "text"},
        default: { control: "text"},
        action: { control: "text"},
    },
    args: {
        id: 'Toast',
        type: Type.SUCCESS,
        tag: "dialog",
        allowClose: true,
        countDown: { active: false, duration: 3000 },
        title: 'Toast Header',
        default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.`,
        action: ''
    }
} as Meta<typeof ToastBox>

export default meta

type Story = StoryObj<typeof ToastBox>

const Template: Story = {
    render: (args) => ({
        components: { ToastBox, BaseIcon, BaseButton },
        setup() {
            const iconName = (type: Type) => {
                switch (type) {
                    case Type.SUCCESS:
                        return "IconFeedbackSuccess"
                    case Type.WARNING:
                        return "IconFeedbackWarning"
                    case Type.ERROR:
                        return "IconFeedbackError"
                    default:
                        return "IconFeedbackInfo"
                }
            }
            return {
                args,
                IconTypes,
                IconSizes,
                ButtonTypes,
                ButtonSizes,
                Type,
                iconName
            }
        },
        template: `
        <section style="min-height: 50vh">
        <ToastBox
            v-bind="args"
            @close="handleClose"
        >
            <template #icon>
                <BaseIcon
                    :id="'CloseIcon'"
                    :type="IconTypes.FEEDBACK"
                    :name="iconName(args.type)"
                    :size="IconSizes.S"
                ></BaseIcon>
            </template>
            <template #title> {{args.title}}</template>
            {{args.default}}
            <template #action>
                <BaseButton @send="action" :type="ButtonTypes.TERTIARY" :size="ButtonSizes.S">
                    Action
                </BaseButton>
            </template>
        </ToastBox>                    
        </section>
        `,
        methods: {
            handleClose: action('close'),
            action: action('clicked')
        }
    })
}

export const Default: Story = {
    ...Template,
    args: {}
}