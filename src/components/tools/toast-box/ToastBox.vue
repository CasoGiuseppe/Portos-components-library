<template>
    <div
        :class="[
            'toast-box',
            `toast-box--is-${type}`,
            visibility,
            `toast-box--is-${variant}`
        ]"
        @mouseover="resetTimer"
        @mouseleave="startTimer"
    >
        <div class="toast-box__icon">
            <slot name="icon"></slot>
        </div>

        <header class="toast-box__header">
            <slot name="header">Default Header</slot>
        </header>

        <BaseIcon
            class="toast-box__close"
            :id="'CloseIcon'"
            :type="Types.NAVIGATION"
            :name="'IconNavigationCloseM'"
            @click="closeToast"
            :size="Sizes.XS"
        ></BaseIcon>

        <div class="toast-box__body">
            <slot name="body">Default Body</slot>
        </div>

        <div class="toast-box__footer">
            <slot name="footer"> </slot>
        </div>
    </div>
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
    timer.value = setTimeout(() => {
        closeToast()
    }, props.duration)
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
    }
)

onMounted(() => {
    startTimer()
})

onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
})
</script>

<style lang="scss" src="./ToastBox.scss"></style>
