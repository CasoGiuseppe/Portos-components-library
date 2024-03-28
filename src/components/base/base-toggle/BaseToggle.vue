<template>
    <label
        :class="[
            'base-toggle',
            `base-toggle--is-${size}`,
            `${variant ? `base-toggle--is-ALT` : ''}`
        ]"
        :title="label"
        :aria-label="label"
        @change="handleChange"
    >
        <input
            ref="checkbox"
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            :aria-disabled="disabled"
            style="display: none;"
        >
        <button
            class="base-toggle__switch"
            @keyup.enter="setChangeByKey"
            @keyup.space="setChangeByKey"
        />
        <slot />
    </label>
</template>
<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import { type UniqueId, Sizes } from './types';
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation';

const { disabled } = defineProps({
    /**
    * Set the unique id of the ui toggle
    */
    id: {
        type: String as PropType<UniqueId>,
        default: 'toggleId'
    },
    /**
    * Set the toggle size mode [M, S]
    */
    size: {
        type: String as PropType<Sizes>,
        default:Sizes.M,
        validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
    },
    /**
    * Set checked state
    */
    checked: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    /**
    * Set the disabled toggle state
    */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
    * Set variant type state
    */
    variant: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
    * Set the aria accesibility label
    */
    label: {
        type: String as PropType<string>,
        default: 'component label'
    }
})

const emits = defineEmits(['checked'])
const checkbox = ref<HTMLInputElement | null>(null);

const handleChange = (payload: Event) => {
    const { checked } = (payload.target as HTMLInputElement)
    emits('checked', checked)
}

const setChangeByKey = () => {
    if(disabled) return;
    if(!checkbox.value) return;
    const { checked } = checkbox.value
    checkbox.value.checked = !checked
    emits('checked', checkbox.value.checked)
}
</script>
<style src="./BaseToggle.scss" lang="scss"></style>