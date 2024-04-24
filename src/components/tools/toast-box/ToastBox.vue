<template>
    <component
        :is="tag"
        :class="[
            'toast-box',
            `toast-box--is-${type}`,
            `toast-box--is-${tag}`,
        ]"
        @mouseover="resetTimer"
        @mouseleave="startTimer"
        data-testID="ui-toast-box"
    >
        <picture
            v-if="$slots['icon']"
            class="toast-box__icon"
        >
            <slot name="icon"></slot>
        </picture>
        <section class="toast-box__body">
            <header
                class="toast-box__title"
                data-testID="ui-toast-box-title"
                v-if="$slots['title']"
            >
                <!-- @slot Title slot for show toast header-->
                <slot name="title"></slot>
            </header>
            <p
                class="toast-box__description"
                v-if="$slots['default']"
                data-testID="ui-toast-box-description"
            >
                <!-- @slot Body slot for the toast description-->
                <slot />
            </p>
        </section>

        <aside class="toast-box__actions">
            <button
                v-if="allowClose"
                class="toast-box__actions-close"
                @click="handleClose"
            >
            </button>

            <!-- @slot Button custom action slot for the user handler-->
            <slot name="action"></slot>
        </aside>
    </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type PropType } from "vue"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"
import { Tags, type UniqueId, Type, type IContdown } from "@/components/tools/toast-box/types"

const { countDown } = defineProps({
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
     allowClose: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
     * Set the toast type [success, warning, info, error]
     */
    type: {
        type: String as PropType<Type>,
        default: Type.INFO,
        validator: (prop: Type) => validateValueCollectionExists({collection: Type,value: prop})
    },
    /**
     * Set tag type
     */
    tag: {
        type: String as PropType<Tags>,
        default: Tags.DIALOG,
        validator: (prop: Tags) => validateValueCollectionExists({ collection: Tags, value: prop})
    },

     /**
     * Set timing to hide toast
     */
    countDown: {
        type: Object as PropType<IContdown>,
        default: () => { return { active: false, duration: 3000 } }
    },
})

const timeout = ref<ReturnType<typeof setTimeout> | null>(null)
const emits = defineEmits(["close"])

const startTimer = () => {
    if(!countDown?.active) return
    timeout.value = setTimeout(() => handleClose() , countDown.duration)
}

const resetTimer = () => {
    if (timeout.value)  clearTimeout(timeout.value)
}

const handleClose = () => emits("close")

onMounted(() => startTimer())

onUnmounted(() => {
    if (timeout.value) {
        clearTimeout(timeout.value)
    }
})
</script>

<style lang="scss" src="./ToastBox.scss"></style>
