<template>
    <section class="navigation-contextual-toolbar">
        <h2 class="navigation-contextual-toolbar__title">
            {{ title }}
        </h2>
        <menu class="navigation-contextual-toolbar__menu">
            <button @click="switchMenu">
                <BaseIcon
                    class="navigation-contextual-toolbar__menu-icon"
                    :id="'CloseIcon'"
                    :type="IconTypes.NAVIGATION"
                    :name="'IconNavigationMoreVertical'"
                    :size="IconSizes.S"
                ></BaseIcon>
            </button>
            <div
                :class="[
                    'navigation-contextual-toolbar__menu-contextual',
                    {
                        'navigation-contextual-toolbar__menu-contextual--opened':
                            isVisible
                    }
                ]"
            >
                <!-- @slot for the contextual menu-->
                <slot></slot>
            </div>
        </menu>
    </section>
</template>

<script setup lang="ts">
import { type PropType, ref } from "vue"
import BaseIcon from "@/components/base/base-icon/BaseIcon.vue"
import {
    Types as IconTypes,
    Sizes as IconSizes
} from "@/components/base/base-icon/types"

const { title } = defineProps({
    title: {
        type: String as PropType<string>,
        default: ""
    }
})

const isVisible = ref(false)
const emit = defineEmits(["menu"])

const switchMenu = () => {
    isVisible.value = !isVisible.value
    emit("menu", { status: isVisible.value })
}
</script>

<style scoped lang="scss">
$transition-slow: 0.5s ease-out;
$transition-fast: 0.2s ease-in;

.navigation-contextual-toolbar {
    $navigationContextualToolbar: &;
    --toolbar-background: var(--color-neutral-10, #fff);

    @include text-body-m--regular;
    color: var(--color-neutral-60);

    width: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
        @include text-heading-l;
    }

    &__menu {
        display: flex;
        align-items: center;
        position: relative;
        background-color: transparent;
    }

    &__menu-icon {
        cursor: pointer;
    }

    &__menu-contextual {
        position: absolute;
        top: 100%;
        right: 0;
        width: max-content;
        background-color: var(--color-neutral-10);
        border-radius: var(--radius-200);
        margin: var(--spacing-20) 0;
        box-shadow: var(--shadow-200);
        z-index: 10;
        opacity: 0;
        transform: translateY(-20px);
        visibility: hidden;
        transition:
            opacity $transition-fast,
            transform $transition-fast;
    }

    &__menu-contextual--opened {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        transition:
            opacity $transition-slow,
            transform $transition-slow;
    }
}
</style>
