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
import { watchEffect, ref, onMounted, onUnmounted, type PropType } from "vue"
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
        default: "buttonId"
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
        default: "default"
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
        default: "hidden"
    }
})

const emits = defineEmits(["close", "action"])

let visibility = ref(props.visibility)
watchEffect(() => {
    visibility.value = props.visibility
})

const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const emitClose = () => {
    emits("close")
    visibility.value = "hidden"
}

const startTimer = () => {
    timer.value = setTimeout(() => {
        emitClose()
    }, props.duration)
}

const resetTimer = () => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
    startTimer()
}

const closeToast = () => {
    visibility.value = "hidden"
    emits("close")
    console.log("CLOSED")
}

onMounted(() => {
    startTimer()
})

onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
})
</script>

<style scoped lang="scss">
.toast-box {
    @include text-body-m--regular;
    color: var(--color-neutral-70, #000);

    display: grid;
    grid-template-columns: auto 2fr auto;
    grid-template-rows: 1fr 2fr;
    gap: 4px 4px;
    position: fixed;

    max-width: 441px;
    border: var(--spacing-10, 2px) solid;
    border-left: var(--spacing-30, 8px) solid;
    border-radius: var(--radius-300, 8px);
    padding: var(--spacing-50, 16px) var(--spacing-50, 16px)
        var(--spacing-50, 16px) var(--spacing-30, 8px);

    transition:
        transform 0.5s ease,
        opacity 0.5s ease;

    &__icon,
    &__header,
    &__close,
    &__body,
    &__footer {
        transition: inherit;
    }

    &__icon {
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
    }

    &__header {
        grid-area: 1 / 2 / 2 / 3;
        @include text-body-m--bold;
    }

    &__close {
        grid-area: 1 / 3 / 2 / 4;
        aspect-ratio: unset;
        justify-self: end;
        cursor: pointer;
    }

    &__body {
        grid-area: 2 / 2 / 3 / 3;
        color: var(--color-neutral-60, grey);
    }

    &__footer {
        grid-area: 2 / 3 / 3 / 4;
        display: flex;
        align-items: flex-end;
    }

    &--is-default {
        top: 32px;
        right: 8px;
        transform: translateX(100%);
        opacity: 0;

        box-shadow: var(--shadow-200);

        &.visible {
            transform: translateX(0);
            opacity: 1;
        }

        &.hidden {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    &--is-inline {
        opacity: 0;
        &.visible {
            opacity: 1;
        }

        &.hidden {
            opacity: 0;
        }
    }

    &--is {
        &-info {
            border-color: var(--color-info-30, blue);
        }
        &-success {
            border-color: var(--color-success-30, green);
        }

        &-warning {
            border-color: var(--color-warning-30, orange);
        }

        &-error {
            border-color: var(--color-error-30, red);
        }
    }
}
</style>
