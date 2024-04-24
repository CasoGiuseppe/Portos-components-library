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
        </menu>
        <div
            class="navigation-contextual-toolbar__menu-contextual"
            v-if="isVisible"
        >
            <!-- @slot for the contextual menu-->
            <slot></slot>
        </div>
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

const switchMenu = () => {
    isVisible.value = !isVisible.value
}
</script>

<style scoped lang="scss">
.navigation-contextual-toolbar {
    $navigationContextualToolbar: &;
    --toolbar-background: var(--color-neutral-10, #fff);

    @include text-body-m--regular;

    width: 100%;
    background: var(--toolbar-background);
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;

    &__title {
        @include text-heading-l;
    }
    &__icon {
    }
    &__menu-contextual {
        position: absolute;
        bottom: 0;
        right: 0;
    }
}
</style>
