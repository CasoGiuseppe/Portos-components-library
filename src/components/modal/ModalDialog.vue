<template>
    <div class="wrapper">
        <dialog
            :class="`modal-dialog modal-dialog--is-${size}`"
            v-on-click-outside="close"
            v-bind="$attrs"
        >
            <header class="modal-dialog__header">
                <h2 class="modal-dialog__header--title">
                    <slot name="header"></slot>
                </h2>

                <button class="modal-dialog__header--close" @click="close">
                    <BaseIcon
                        :id="'CloseIcon '"
                        :type="Types.NAVIGATION"
                        :name="'IconNavigationCloseM'"
                    ></BaseIcon>
                </button>
            </header>
            <section class="modal-dialog__body">
                <slot></slot>
            </section>
            <footer class="modal-dialog__footer">
                <slot name="actions"></slot>
            </footer>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import { type PropType, defineProps, ref } from "vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import { vOnClickOutside } from "@vueuse/components"
import { Types } from "../base/base-icon/types"
import type { UniqueId, SizeType } from "./types"

const emits = defineEmits(["close"])
const { size } = defineProps({
    id: {
        type: String as PropType<UniqueId>,
        default: "modalDialog"
    },

    size: {
        type: String as PropType<SizeType>,
        default: "narrow",
        validator: (value: SizeType) => ["wide", "narrow"].includes(value)
    }
})

const dialogRef = ref<HTMLElement | null>(null)

function close() {
    emits("close")
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(29, 30, 31, 0.4); //var(--color-neutral-70);
}

.modal-dialog {
    display: block;
    position: relative;
    box-shadow: var(--shadow-200);

    background-color: var(--color-neutral-10);
    border: none;
    border-radius: var(--radius-300);
    gap: var(--spacing-50);
    z-index: 99;

    @include text-body-m--regular;
    color: var(--color-neutral-70);

    &__header {
        display: flex;
        justify-content: space-between;

        &--title {
            @include text-heading-l;
            font-size: var(--spacing-60);
        }

        &--close {
            padding: 0;
        }
    }

    &--is {
        &-wide {
            width: 80vw;
        }

        &-narrow {
            width: 50vw;
        }
    }

    &__body {
        padding: var(--spacing-50) 0;
    }

    &__footer {
        padding-top: 16px;
        display: flex;
        justify-content: flex-end;
    }

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 24px;
    }
}
</style>
