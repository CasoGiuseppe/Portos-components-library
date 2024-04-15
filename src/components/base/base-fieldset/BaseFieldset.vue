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
        <BaseCheckbox
            id="label1"
            active
            @load="setInitValues"
        >label1</BaseCheckbox>
        <BaseCheckbox
            id="label2"
            @load="setInitValues"
        >label2</BaseCheckbox>
    </fieldset>
</template>
<script setup lang="ts">
import { computed, ref, toRaw, useSlots, type PropType } from 'vue';
import BaseCheckbox from '../base-checkbox/BaseCheckbox.vue';
import type { Response } from './types';

const fieldSetValues = ref<Response[]>([]);

defineProps({
    /**
     * Handle disabled state
     */
     disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
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