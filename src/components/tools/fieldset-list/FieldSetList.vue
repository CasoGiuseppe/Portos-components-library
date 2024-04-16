<template>
    <fieldset
        class="fieldset-list"
        :aria-disabled="disabled"
        :disabled="disabled"
        @change="change"
    >
        <label
            v-if="label"
            class="fieldset-list__label">
            <!-- @slot label: Set label title -->
            <slot name="label" />
        </label>
        <ul class="fieldset-list__fields">
            <li
                v-for="{ type, props, label } in fields"
                :key="label.trim()"
            >
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
import { computed, onMounted, ref, toRaw, useSlots, type Component, type PropType } from 'vue';
import type { Response, UniqueId } from './types';

const fieldSetValues = ref<Response[]>([]);

export type IField = {
    type: Component,
    label: string,
    props: Record<string, any>;
}

defineProps({
    /**
     * Set the unique id of the fieldset component
     */
     id: {
        type: String as PropType<UniqueId>,
        default: 'FieldSetId'
    },

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

const customEmits = defineEmits(['send', 'load']);

const change = (payload: Event) => {
    const { checked, id } = (payload.target as HTMLInputElement);
    fieldSetValues.value = Object.assign(fieldSetValues.value, { [id]: checked } as Response );
    customEmits('send', toRaw(fieldSetValues.value))
}

const setInitValues = ({ id, active }: {id: string, active: boolean}) => {
    fieldSetValues.value = Object.assign(fieldSetValues.value, { [id]: active } as Response );
    customEmits('send', toRaw(fieldSetValues.value))
}

onMounted(() => customEmits('load', toRaw(fieldSetValues.value)))
</script>
<style src="./FieldSetList.scss" lang="scss"></style>