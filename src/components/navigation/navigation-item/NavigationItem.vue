<template>
    <button
        :dir="rtl ? 'rtl' : 'ltr'"
        :class="[
            'navigation-item',
            selected ? 'navigation-item--is-selected' : null,
            collapsed ? 'navigation-item--is-collapsed' : null,
            children ? 'navigation-item--has-child' : null
        ]"
        @click="submit"
    >
        <picture class="navigation-item__header">
            <!-- @slot Slot for icon content -->
            <slot name="icon"></slot>
            <button
                v-if="children"
                class="navigation-item__action"
                @click="action"
            />
        </picture>
        <p
            v-if="showLabel"
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
import { type INavigationItemComponent } from './types';

const customEmits = defineEmits(['submit', 'action']);

const slots = useSlots();
const label = computed(() => !!slots['label']);
const children = computed(() => !!slots['children']);
const showLabel = computed(() => label.value && !collapsed);

const { id, collapsed } = withDefaults(defineProps<INavigationItemComponent>(), {
    id: 'item',
    selected: false,
    rtl: true,
    collapsed: false
});

const submit = () => {
    if(children.value) return
    customEmits('submit', id)
};
const action = () => customEmits('action');
</script>

<style src="./NavigationItem.scss" lang="scss"></style>