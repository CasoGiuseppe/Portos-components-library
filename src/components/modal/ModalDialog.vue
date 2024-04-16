<template>
    <dialog
        ref="dialogRef"
        :class="[
            `modal-dialog modal-dialog--is-${size}`,
            { 'modal-dialog--is-open': isOpen }
        ]"
        @cancel="close"
        v-bind="$attrs"
    >
        <div v-on-click-outside="close">
            <header class="modal-dialog__header">
                <h2 class="modal-dialog__header--title">
                    <!-- @slot The title for modal with/without icon-->
                    <slot name="header"></slot>
                </h2>

                <button class="modal-dialog__header--close" @click="close">
                    <BaseIcon
                        :id="'CloseIcon'"
                        :type="Types.NAVIGATION"
                        :name="'IconNavigationCloseM'"
                    ></BaseIcon>
                </button>
            </header>
            <section>
                <!-- @slot for default values. The body and footer (buttons)-->
                <slot name="default"></slot>
            </section>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { type PropType, defineProps, ref, watch, onMounted } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import { Types } from "@/components/base/base-icon/types"
import type { UniqueId, SizeType } from "./types"

const emits = defineEmits(["close", "open"])
const props = defineProps({
    id: {
        type: String as PropType<UniqueId>,
        default: "modalDialog"
    },
    isOpen: {
        type: Boolean
    },

    size: {
        type: String as PropType<SizeType>,
        default: "narrow",
        validator: (value: SizeType) => ["wide", "narrow"].includes(value)
    }
})

watch(
    () => props.isOpen,
    (newVal) => {
        console.log(props.isOpen, newVal)
        if (newVal) open()
        else close()
    }
)

const dialogRef = ref<HTMLDialogElement | null>(null)

function open() {
    emits("open")
    dialogRef.value?.showModal()
}

function close() {
    dialogRef.value?.close()
    emits("close")
}

onMounted(() => {
    console.log(props.isOpen)
    if (props.isOpen) open()
})

// @discuss not sure if should be exposed in the future to manage those from parent components
defineExpose({
    open,
    close
})
</script>

<style lang="scss" src="./ModalDialog.scss"></style>
