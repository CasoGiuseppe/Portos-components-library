<template>
    <button
        :class="[
            'navigation-item',
            selected ? 'navigation-item--is-selected' : '',
        ]"
        @click="() => selectItem(id)"
    >
        <section 
            :class="[
                'navigation-item__container',
                (inversed && !collapsed) ? 'navigation-item--is-inversed' : '',
                collapsed ? 'navigation-item--is-collapsed' : ''
            ]"
        >
            <picture
                :class="[
                    'navigation-item__header',
                    children?.length ? 'navigation-item--is-parent' : ''
                ]"
            >
                <slot name="icon"></slot>
                <BaseIcon
                    v-if="children?.length"
                    name="IconChevronRightM"
                    :type="Types.CHEVRON"
                    :size="Sizes.XS"
                    
                />
            </picture>
            <p
                v-if="!collapsed"
                class="navigation-item__label"
                v-text="label"
            />
        </section>
    </button>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Sizes, Types } from '@/components/base/base-icon/types';
import { type INavigationItemComponent } from './types';

const emit = defineEmits<{
  (e: 'select', id: number): void
}>();

withDefaults(defineProps<INavigationItemComponent>(), {
    id: 0,
    label: '',
    selected: false,
    inversed: false,
    children: undefined,
    collapsed: false
});

const selectItem = (id: number) => {
    emit('select', id);
}
</script>

<style src="./NavigationItem.scss" lang="scss"></style>