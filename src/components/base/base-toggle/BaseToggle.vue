<template>
    <label
        :class="[
            'base-toggle',
            `base-toggle--is-${size}`,
        ]"
        :title="label"
        :aria-label="label"
        @change="handleChange"
    >
        <input
            v-show="false"
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            :aria-disabled="disabled"
        >
        <span class="base-toggle__switch"></span>
        <slot />
    </label>
</template>
<script lang="ts" setup>
import { type PropType } from 'vue';
import { type UniqueId, Sizes } from './types';
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation';

defineProps({
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
        default:Sizes.S,
        validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
    },
    /**
    * Set checked state
    */
    checked: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
    * Set the disabled toggle state
    */
    disabled: {
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

const handleChange = (payload: Event) => {
    const { checked } = (payload.target as HTMLInputElement)
    emits('checked', checked)
}
</script>
<style src="./BaseToggle.scss" lang="scss"></style>