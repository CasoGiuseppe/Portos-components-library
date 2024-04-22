<template>
    <component
        :is="tag"
        :class="[
            'toast-box',
            `toast-box--is-${type}`,
            visibility,
            { 'toast-box--is-default': tag === 'dialog' }
        ]"
        @mouseover="resetTimer"
        @mouseleave="startTimer"
        data-testID="ui-toast-box"
    >
        <section class="toast-box__icon" v-if="$slots['icon']">
            <slot name="icon"></slot>
        </section>
        <section class="toast-box__middle">
            <header
                class="toast-box__middle-title"
                data-testID="ui-toast-box-title"
                v-if="$slots['title']"
            >
                <!-- @slot for the toast title-->
                <slot name="title"></slot>
            </header>
            <p
                class="toast-box__middle-description"
                v-if="$slots['description']"
                data-testID="ui-toast-box-description"
            >
                <!-- @slot for the toast description-->
                <slot name="description"></slot>
            </p>
        </section>

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
                <!-- @slot for the footer button-->
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
    type UIToastTag,
    UIToastType,
    type UIToastVisibility,
    type UIToastTimer
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
     * Set tag type
     */
    tag: {
        type: String as PropType<UIToastTag>,
        default: "dialog",
        validator: (prop: UIToastTag) => ["dialog", "aside"].includes(prop)
    },

    timer: {
        type: Object as PropType<UIToastTimer>,
        default: { active: false, duration: 3000 } as UIToastTimer
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

const countDown = ref<ReturnType<typeof setTimeout> | null>(null)
const emits = defineEmits(["close", "action"])
let visibility = ref(props.visibility)

const startTimer = () => {
    if (props.timer && props.timer.active) {
        countDown.value = setTimeout(() => {
            closeToast()
        }, props.timer.duration)
    }
}

const resetTimer = () => {
    if (countDown.value) {
        clearTimeout(countDown.value)
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
    startTimer()
})

onUnmounted(() => {
    if (countDown.value) {
        clearTimeout(countDown.value)
    }
})
</script>

<style lang="scss" src="./ToastBox.scss"></style>
