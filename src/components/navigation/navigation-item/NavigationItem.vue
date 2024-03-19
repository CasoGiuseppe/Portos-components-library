<template>
    <button
        :dir="rtl ? 'rtl' : 'ltr'"
        :class="[
            'navigation-item',
            selected ? 'navigation-item--is-selected' : null,
            collapsed ? 'navigation-item--is-collapsed' : null,
            children ? 'navigation-item--has-child' : null
        ]"
        @click="() => selectItem(id)"
    >
        <picture class="navigation-item__header">
            <!-- @slot Slot for icon content -->
            <slot name="icon"></slot>
            <button
                class="navigation-item__action"
                @click="xxx"
            />
        </picture>
        <p
            v-if="!collapsed && label"
            class="navigation-item__label"
        >
            <!-- @slot Slot for label content -->
            <slot name="label" />
        </p>

        <!-- @slot Slot for second level content -->
        <slot name="children" />
    </button>
</template>

<script setup lang="ts">
import { computed, useSlots} from 'vue';
// import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
// import { Sizes, Types } from '@/components/base/base-icon/types';
import { type INavigationItemComponent } from './types';

const emit = defineEmits<{ (e: 'select', id: number): void }>();

const slots = useSlots();
const label = computed(() => !!slots['label']);
const children = computed(() => !!slots['children']);

withDefaults(defineProps<INavigationItemComponent>(), {
    id: 0,
    selected: false,
    rtl: true,
    collapsed: false
});

const selectItem = (id: number) => {
    emit('select', id);
}

const xxx = () => console.log('ciccio');
</script>

<style src="./NavigationItem.scss" lang="scss"></style>