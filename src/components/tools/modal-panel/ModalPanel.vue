<template>
    <dialog
        ref="dialogRef"
        :id="id"
        class="modal-panel"
        :data-size="size"
        :data-drawer="isDrawer ? true : null"
        :data-scroll="checkIntersectingState"
        @cancel="behaviours.close"
    >
        <section
            class="modal-panel__content"
            v-on-click-outside="behaviours.close"
        >
            <header class="modal-panel__header">
                <slot name="back" />
                <h2 class="modal-panel__title">
                    <!-- @slot The title for modal with/without icon-->
                    <slot name="header"></slot>
                </h2>
                <button class="modal-panel__close" @click="behaviours.close" />
            </header>
            <section class="modal-panel__body">
                <section ref="observed">
                    <!-- @slot for default values-->
                    <slot />
                </section>
            </section>
            <footer class="modal-panel__footer">
                <!-- @slot for footer values-->
                <slot name="footer"></slot>
            </footer>
        </section>
    </dialog>
</template>

<script setup lang="ts">
import { type PropType, defineProps, ref, onMounted, computed } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver'
import { type UniqueId, Sizes } from "./types"
import { validateValueCollectionExists } from '@ui/utilities/validation/useValidation';

const emits = defineEmits(["close", "open"])
const { isDrawer } = defineProps({
    id: {
        type: String as PropType<UniqueId>,
        default: "modalDialog"
    },
    size: {
        type: String as PropType<Sizes>,
        default: "auto",
        validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
    },
    isDrawer: {
        type: Boolean as PropType<boolean>,
        default: false
    },
})

const dialogRef = ref<HTMLDialogElement | null>(null)
const observed = ref<HTMLElement | null>(null)
const isScrolled = ref<boolean |undefined>(undefined);
const checkIntersectingState = computed(() => isScrolled.value === undefined ? null : !isScrolled.value)

const { createObserver } = useIntersectionObserver({
  action: (e: any) => {
      const { isIntersecting } = e
      isScrolled.value = isIntersecting
  }
})

const behaviours = {
    close : (): void => emits('close'),

    open : (): void => {
        dialogRef.value?.showModal();
        emits('open')
    }
}

onMounted(() => {
    behaviours.open();

    if(!observed.value) return;
    if(!isDrawer) return;

    dialogRef.value?.addEventListener("animationend", () => {
        createObserver({
            element: observed.value as HTMLElement,
            options: {
                root: null,
                rootMargin: "0px",
                threshold: 1
            }
        })
    })
})

</script>

<style lang="scss" src="./ModalPanel.scss"></style>
