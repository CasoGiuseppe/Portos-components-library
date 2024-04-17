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
        <div class="toast-box__grid-item toast-box__icon">
            <slot name="icon"></slot>
        </div>

        <header class="toast-box__grid-item toast-box__header">
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

        <div class="toast-box__grid-item toast-box__body">
            <slot name="body">Default Body</slot>
        </div>

        <div class="toast-box__grid-item toast-box__footer">
            <slot name="footer"> </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type PropType } from "vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import { Types, Sizes } from "@/components/base/base-icon/types"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"
import {
    type UniqueId,
    type UIToastVariant,
    UIToastType
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
        default: UIToastType.INFO
        /* validator: (prop: UIToastType) =>
            validateValueCollectionExists({ collection: Types, value: prop }) */
    },
    /**
     * Set variant type state
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
    }
})

const emits = defineEmits(["close", "action"])

const visibility = ref("visible")

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
    color: var(--color-neutral-70);

    max-width: 441px;
    //grid
    display: grid;
    grid-template-columns: auto 1fr auto; // 3 columns: icon, content, close button
    grid-template-rows: auto 1fr auto; // 3 rows: header, body, footer
    gap: 0.5rem; // You can adjust the gap between grid items
    position: relative;
    transition: visibility 0.5s;
    border: var(--spacing-10, 2px) solid;
    border-left: var(--spacing-30, 8px) solid;
    border-radius: var(--radius-300, 8px);
    padding: var(--spacing-50, 16px);
    gap: var(--spacing-50, 16px);

    &__grid-item {
        //display: flex;
    }

    &__icon {
        grid-area: 1 / 1 / 2 / 2; // Icon position in grid
        display: flex;
    }

    &__header {
        grid-area: 1 / 2 / 2 / 3; // Header position in grid
        @include text-body-m--bold;
        //font-size: var(--spacing-60);
    }

    &__close {
        grid-area: 1 / 3 / 2 / 4; // Close button position in grid
        aspect-ratio: unset;
        display: flex;
        justify-content: flex-end;
    }

    &__body {
        grid-area: 2 / 2 / 4 / 3; // Body position in grid
        color: var(--color-neutral-60, grey);
    }

    &__footer {
        grid-area: 3 / 3 / 4 / 4; // Footer button position in grid
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

.hidden {
    //visibility: hidden;
}
.visible {
    visibility: visible;
}
</style>
