<template>
    <component
        :is="variant === 'default' ? 'dialog' : 'aside'"
        :class="[
            'toast-box',
            `toast-box--is-${type}`,
            visibility,
            `toast-box--is-${variant}`
        ]"
        @mouseover="resetTimer"
        @mouseleave="startTimer"
        data-testID="ui-toast-box"
    >
        <section class="toast-box__icon" v-if="$slots['icon']">
            <slot name="icon"></slot>
        </section>
        <main class="toast-box__main">
            <header
                class="toast-box__main-header"
                data-testID="ui-toast-box-header"
                v-if="$slots['header']"
            >
                <slot name="header"></slot>
            </header>
            <section
                class="toast-box__main-body"
                v-if="$slots['body']"
                data-testID="ui-toast-box-body"
            >
                <slot name="body"></slot>
            </section>
        </main>

        <section class="toast-box__actions">
            <div>
                <BaseIcon
                    v-if="canClose"
                    class="toast-box__actions-close"
                    data-testID="ui-toast-box-close"
                    :id="'CloseIcon'"
                    :type="Types.NAVIGATION"
                    :name="'IconNavigationCloseM'"
                    @click="closeToast"
                    :size="Sizes.XS"
                ></BaseIcon>
            </div>

            <footer
                class="toast-box__actions-footer"
                v-if="$slots['footer']"
                data-testID="ui-toast-box-footer"
            >
                <slot name="footer"></slot>
            </footer>
        </section>
    </component>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, onUnmounted, type PropType } from "vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import { Types, Sizes } from "@/components/base/base-icon/types"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"
import {
    type UniqueId,
    type UIToastVariant,
    UIToastType,
    type UIToastVisibility
} from "@/components/tools/toast-box/types"

const props = defineProps({
    /**
     * Set the unique id of the ui button
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "toastId"
    },
    /**
     * Set the close icon visibility
     */
    canClose: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * Set the toast type [success, warning, info, error]
     */
    type: {
        type: String as PropType<UIToastType>,
        default: UIToastType.INFO,
        validator: (prop: UIToastType) =>
            validateValueCollectionExists({
                collection: UIToastType,
                value: prop
            })
    },
    /**
     * Set variant type
     */
    variant: {
        type: String as PropType<UIToastVariant>,
        default: "default",
        validator: (prop: UIToastVariant) =>
            ["default", "inline"].includes(prop)
    },

    /**
     * Set the toast duration time in miliseconds
     */
    duration: {
        type: Number as PropType<number>,
        default: 3000
    },
    /**
     * Set the component visibility
     */
    visibility: {
        type: String as PropType<UIToastVisibility>,
        default: "hidden",
        validator: (prop: UIToastVisibility) =>
            ["hidden", "visible"].includes(prop)
    }
})

const timer = ref<ReturnType<typeof setTimeout> | null>(null)
const emits = defineEmits(["close", "action"])
let visibility = ref(props.visibility)

const startTimer = () => {
    if (props.variant === "default") {
        timer.value = setTimeout(() => {
            closeToast()
        }, props.duration)
    }
}

const resetTimer = () => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
}

const closeToast = () => {
    visibility.value = "hidden"
    emits("close")
}

watch(
    () => props.visibility,
    (isVisible) => {
        visibility.value = isVisible
        if (isVisible === "visible") {
            startTimer()
        }
    }
)

onMounted(() => {
    if (props.variant === "default") {
        startTimer()
    }
})

onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
})
</script>

<style lang="scss" src="./ToastBox.scss"></style>
