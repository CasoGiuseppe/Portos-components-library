<template>
    <fieldset
        class="base-fieldset"
        :aria-disabled="disabled"
        :disabled="disabled"
        @change="change"
    >
        <label
            v-if="label"
            class="base-fieldset__label">
            <slot name="label" />
        </label>
        <ul class="base-fieldset__fields">
            <li v-for="{ type, props, label } in fields">
                <Component
                    :is="type"
                    v-bind="props"
                    @load="setInitValues"
                >
                    {{  label }}
                </Component>
            </li>
        </ul>
    </fieldset>
</template>
<script setup lang="ts">
import { computed, ref, toRaw, useSlots, type Component, type PropType } from 'vue';
import type { Response } from './types';

const fieldSetValues = ref<Response[]>([]);

export type IField = {
    type: Component,
    label: string,
    props: Record<string, any>;
}

defineProps({
    /**
     * Handle disabled state
     */
     disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },

    /**
     * Set the list of component fields
     */
     fields: {
        type: Array as PropType<Array<IField>>,
        default: () => []
    }
})

const slots = useSlots();
const label = computed(() => !!slots['label']);

const customEmits = defineEmits(['send']);

const change = (payload: Event) => {
    const { checked, id } = (payload.target as HTMLInputElement);
    fieldSetValues.value = Object.assign(fieldSetValues.value, { [id]: checked } as Response );
    customEmits('send', toRaw(fieldSetValues.value))
}

const setInitValues = ({ id, active }: {id: string, active: boolean}) => {
    fieldSetValues.value = Object.assign(fieldSetValues.value, { [id]: active } as Response );
    customEmits('send', toRaw(fieldSetValues.value))
}
</script>
<style src="./BaseFieldset.scss" lang="scss"></style>