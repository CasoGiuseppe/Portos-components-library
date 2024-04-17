import type { Meta, StoryObj } from "@storybook/vue3"
import ToastBox from "@/components/tools/toast-box/ToastBox.vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import BaseButton from "@/components/base/base-button/BaseButton.vue"
import { UIToastType } from "@/components/tools/toast-box/types"
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
    argTypes: {
        borderColor: { control: "color" },
        duration: { control: "number" },
        type: { control: "select", options: Object.values(UIToastType) },
        visibility: {
            control: "boolean"
        },
        variant: {
            control: "select",
            options: { default: "default", inline: "inline" }
        },
        close: { action: "close" },
        action: { action: "action" }
    },
    args: {
        duration: 3000,
        type: UIToastType.SUCCESS,
        visibility: "visible",
        variant: "default"
    }
} as Meta<typeof ToastBox>

export default meta

type Story = StoryObj<typeof ToastBox>

const Template: Story = {
    render: (args) => ({
        components: { ToastBox, BaseIcon, BaseButton },
        setup() {
            const onClose = action("close")
            const onAction = action("action")
            const iconName = (type: UIToastType) => {
                switch (type) {
                    case UIToastType.SUCCESS:
                        return "IconFeedbackSuccess"
                    case UIToastType.WARNING:
                        return "IconFeedbackWarning"
                    case UIToastType.ERROR:
                        return "IconFeedbackError"
                    default:
                        return "IconFeedbackInfo"
                }
            }
            return {
                args,
                onClose,
                onAction,
                IconTypes,
                IconSizes,
                ButtonTypes,
                ButtonSizes,
                UIToastType,
                iconName
            }
        },
        template: `
        <section style="padding: 3rem">
            <ToastBox
                :duration="args.duration"
                :border-color="args.borderColor"
                :type="args.type"
                :visibility="args.visibility ? 'visible' : 'hidden'"
                :variant="args.variant"
                @close="onClose"
                @action="onAction"
            >
                <template #icon>
                    <BaseIcon
                        :id="'CloseIcon'"
                        :type="IconTypes.FEEDBACK"
                        :name="iconName(args.type)"
                        :size="IconSizes.M"
                    ></BaseIcon>
                </template>
                <template #header> Custom Header</template>
                <template #body>This is a very very very very looong text</template>
                <template #footer>
                    <BaseButton :type="ButtonTypes.TERTIARY" :size="ButtonSizes.S">
                        Test me please
                    </BaseButton>
                </template>
            </ToastBox>
        </section>
        `
    })
}

export const Default: Story = {
    ...Template,
    args: {
        // default args from meta
    }
}

export const SuccessType: Story = {
    ...Template,
    args: {
        ...meta.args,
        type: UIToastType.SUCCESS
    }
}

export const InfoType: Story = {
    ...Template,
    args: {
        ...meta.args,
        type: UIToastType.INFO
    }
}

export const WarningType: Story = {
    ...Template,
    args: {
        ...meta.args,
        type: UIToastType.WARNING
    }
}

export const ErrorType: Story = {
    ...Template,
    args: {
        ...meta.args,
        type: UIToastType.ERROR
    }
}
