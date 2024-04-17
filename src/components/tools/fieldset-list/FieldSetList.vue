<template>
    <fieldset
        ref="fieldset"
        class="fieldset-list"
        :aria-disabled="disabled"
        :disabled="disabled"
        @change="change"
    >
        <label
            v-if="$slots['label']"
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
                    :name="name"
                >
                    {{  label }}
                </Component>
            </li>
        </ul>
    </fieldset>
</template>
<script setup lang="ts">
import { onMounted, ref, type Component, type PropType } from 'vue';
import type { Response, UniqueId } from './types';

const fieldset = ref<HTMLElement | null>();

export type IField = {
    type: Component,
    label: string,
    props: Record<string, any>;
}

const { name } = defineProps({
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
    },
    /**
     * Set the checkbox name
     */
     name: {
        type: String as PropType<string>,
        default: 'fieldsetName'
    },
})

const customEmits = defineEmits(['send', 'load']);
const change = () => customEmits('send', getElementsListValues())
const getElementsListValues = ():Response[] | undefined => {
    if(!fieldset.value) return;
    return [...fieldset.value.querySelectorAll(`*[name=${name}]`)].map(node => {
        return {
            [node.id]: (node as HTMLInputElement).checked,
        }
    })
}

onMounted(() => customEmits('load', getElementsListValues()))
</script>
<style src="./FieldSetList.scss" lang="scss"></style>