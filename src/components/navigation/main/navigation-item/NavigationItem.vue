<template>
    <button
        :dir="rtl ? 'rtl' : 'ltr'"
        :class="[
            'navigation-item',
            selected ? 'navigation-item--is-selected' : null,
            collapsed ? 'navigation-item--is-collapsed' : null,
            children ? 'navigation-item--has-second-level' : null,
            insideFocus ? 'navigation-item--has-inside-focus' : null
        ]"
        data-testID="ui-navigation-item"
        v-click-outside="outsideAction"
        @click="submit"
    >
        <picture class="navigation-item__user-icon">
            <!-- @slot Slot for icon content -->
            <slot name="icon"></slot>
        </picture>

        <button
            v-if="children"
            class="navigation-item__action"
            data-testID="ui-navigation-item-action"
        />
        <p
            v-if="showLabel"
            class="navigation-item__label"
            :dir="rtl ? 'rtl' : 'ltr'"
        >
            <!-- @slot Slot for label content -->
            <slot name="label" />
        </p>

        <aside
            v-if="children"
            class="navigation-item__second-level"
            tabindex="0"
        >
            <!-- @slot Slot for second level content -->
            <slot name="children" />
        </aside>
    </button>
</template>

<script setup lang="ts">
import { computed, useSlots, ref } from 'vue';
import { type INavigationItemComponent } from './types';

const customEmits = defineEmits(['submit']);
const insideFocus = ref<boolean>(false);

const props = withDefaults(defineProps<INavigationItemComponent>(), {
    id: 'item',
    selected: false,
    rtl: true,
    collapsed: false
});

const slots = useSlots();
const label = computed(() => !!slots['label']);
const children = computed(() => !!slots['children']);
const showLabel = computed(() => label.value && !props.collapsed);

const submit = () => {
    insideFocus.value = true;
    customEmits('submit', props.id)
};

const outsideAction = () => insideFocus.value = false;

</script>

<style src="./NavigationItem.scss" lang="scss"></style>