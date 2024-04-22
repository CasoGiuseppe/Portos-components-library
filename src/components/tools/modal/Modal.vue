<template>
    <dialog
        ref="dialogRef"
        :id="id"
        :class="[
            'modal',
            `modal--is-${size}`,
        ]"
        @cancel="behaviours.close"
    >
        <section
            class="modal__content"
            v-on-click-outside="behaviours.close"
        >
                <h2 class="modal__title">
                    <!-- @slot The title for modal with/without icon-->
                    <slot name="header"></slot>
                    <button class="modal__close" @click="behaviours.close" />
                </h2>
            <section class="modal__body">
                <!-- @slot for default values-->
                <slot />
            </section>
            <footer class="modal__footer">
                <!-- @slot for footer values-->
                <slot name="footer"></slot>
            </footer>
        </section>
    </dialog>
</template>

<script setup lang="ts">
import { type PropType, defineProps, ref, watch, onMounted } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import { type UniqueId, Sizes } from "./types"
import { validateValueCollectionExists } from '@ui/utilities/validation/useValidation';

const emits = defineEmits(["close", "open"])
const props = defineProps({
    id: {
        type: String as PropType<UniqueId>,
        default: "modalDialog"
    },
    active: {
        type: Boolean as PropType<boolean>,
        default: false
    },

    size: {
        type: String as PropType<Sizes>,
        default: "narrow",
        validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
    }
})

const dialogRef = ref<HTMLDialogElement | null>(null)
const behaviours = {
    close : (): void => {
        dialogRef.value?.close();
        emits('close')
    },

    open : (): void => {
        dialogRef.value?.showModal();
        emits('open')
    }
}

watch(
    () => props.active,
    (newVal) => behaviours[newVal ? 'open' : 'close']()
)

onMounted(() => { if (props.active) behaviours.open() })
</script>

<style lang="scss" src="./Modal.scss"></style>
