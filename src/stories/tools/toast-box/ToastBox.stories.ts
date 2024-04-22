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
        canClose: {
            control: "boolean"
        },
        tag: {
            control: "select",
            options: { dialog: "dialog", aside: "aside" }
        },
        close: { action: "close" },
        action: { action: "action" }
    },
    args: {
        duration: 3000,
        type: UIToastType.SUCCESS,
        visibility: "visible",
        tag: "dialog",
        canClose: true
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
            const onButtonAction = () => {
                action("Button clicked!")()
                alert("Button was clicked!")
            }
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
                onButtonAction,
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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et leo duis ut diam quam nulla porttitor massa. Libero id faucibus nisl tincidunt eget nullam non. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Libero enim sed faucibus turpis in eu mi bibendum. Praesent elementum facilisis leo vel. Nullam eget felis eget nunc. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Et ultrices neque ornare aenean euismod elementum. Sit amet tellus cras adipiscing enim eu turpis egestas. Sagittis vitae et leo duis ut diam quam nulla porttitor. Nisl rhoncus mattis rhoncus urna neque viverra justo. Risus pretium quam vulputate dignissim suspendisse in est. Scelerisque felis imperdiet proin fermentum leo vel orci. Diam sit amet nisl suscipit adipiscing bibendum est. Viverra suspendisse potenti nullam ac tortor.</p>
        <ToastBox
            :duration="args.duration"
            :border-color="args.borderColor"
            :type="args.type"
            :visibility="args.visibility ? 'visible' : 'hidden'"
            :tag="args.tag"
            :canClose="args.canClose"
            @close="onClose"
            @action="onAction"
        >
            <template #icon>
                <BaseIcon
                    :id="'CloseIcon'"
                    :type="IconTypes.FEEDBACK"
                    :name="iconName(args.type)"
                    :size="IconSizes.S"
                ></BaseIcon>
            </template>
            <template #header> Custom Header</template>
            <template #body>This is a very very very very looong text and much more more more large text</template>
            <template #footer>
                <BaseButton @click="onButtonAction" :type="ButtonTypes.TERTIARY" :size="ButtonSizes.S">
                    Action
                </BaseButton>
            </template>
        </ToastBox>
        <p>Eu feugiat pretium nibh ipsum consequat. Sed sed risus pretium quam vulputate dignissim suspendisse in. Est ullamcorper eget nulla facilisi etiam dignissim. Facilisis leo vel fringilla est ullamcorper. Odio morbi quis commodo odio aenean sed adipiscing. Ac turpis egestas integer eget aliquet nibh praesent tristique. Sit amet commodo nulla facilisi. Quis viverra nibh cras pulvinar mattis nunc. Sem viverra aliquet eget sit amet. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Bibendum est ultricies integer quis auctor. A diam maecenas sed enim ut sem viverra aliquet. Lectus arcu bibendum at varius. Fermentum leo vel orci porta non. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras.</p>

        <p>Ut ornare lectus sit amet est placerat in. Enim eu turpis egestas pretium aenean. Elementum integer enim neque volutpat. Proin sed libero enim sed faucibus. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Facilisi nullam vehicula ipsum a arcu. At tellus at urna condimentum. Volutpat est velit egestas dui id ornare arcu odio ut. Arcu non sodales neque sodales ut etiam sit amet. Scelerisque felis imperdiet proin fermentum leo vel orci.</p>

        <p>Eu mi bibendum neque egestas congue quisque egestas. Amet luctus venenatis lectus magna fringilla urna porttitor. Ultricies leo integer malesuada nunc vel risus commodo. Viverra justo nec ultrices dui sapien eget. Imperdiet massa tincidunt nunc pulvinar. Elit duis tristique sollicitudin nibh. Vulputate ut pharetra sit amet. Id velit ut tortor pretium. Nec sagittis aliquam malesuada bibendum. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Commodo viverra maecenas accumsan lacus vel facilisis. Neque ornare aenean euismod elementum nisi quis eleifend. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Turpis egestas integer eget aliquet nibh praesent tristique magna sit. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis.</p>

        <p>A arcu cursus vitae congue mauris rhoncus aenean vel. Adipiscing enim eu turpis egestas pretium. Id semper risus in hendrerit gravida rutrum quisque non. Morbi tempus iaculis urna id volutpat lacus. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Morbi non arcu risus quis varius quam quisque. Arcu felis bibendum ut tristique et egestas quis ipsum. Eget nullam non nisi est. Arcu risus quis varius quam quisque id diam vel quam. Amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit.</p>
                    
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
