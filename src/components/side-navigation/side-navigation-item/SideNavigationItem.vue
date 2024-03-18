<template>
    <div
        :class="setDynamicClass(
            'side-navigation-item',
            selected,
            'side-navigation-item--is-selected'
        )"
        @click="toggleSelected"
    >
        <div class="side-navigation-item__container">
            <div :class="setDynamicClass(
                'side-navigation-item__header',
                inverse,
                'right-direction'
            )">
                <slot name="icon"></slot>
                <BaseIcon
                    v-if="children?.length"
                    name="IconChevronRightM"
                    :type="Types.CHEVRON"
                    :size="Sizes.XS"
                />
            </div>
            <span
                v-if="expanded"
                :class="setDynamicClass(
                    'side-navigation-item__label',
                    inverse,
                    'right-direction'
                )"
            >
                <slot name="label"></slot>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Sizes, Types } from '@/components/base/base-icon/types';
import setDynamicClass from '@/helpers/setDynamicClass';
import { type ISideNavigationItemComponent } from './types';

const { inverse } = withDefaults(defineProps<ISideNavigationItemComponent>(), {
    inverse: false,
    children: undefined,
    expanded: true
});


const selected = ref(false)

const toggleSelected = () => {
    selected.value = !selected.value
}
</script>

<style src="./SideNavigationItem.scss" lang="scss"></style>