<template>
    <fieldset :class="
        [
            'base-input__fieldset',
            'base-input--is-reset',
            `${failed ? 'base-input--is-failed' : ''}`
        ]
    ">
        <header class="base-input__header">
            <label
                v-if="label"
                class="base-input__label"
                :data-required="!required ? '(optional)' : null"
                :for="id"
            ><slot name="label" /></label>

            <span>icono</span>
        </header>
        <section class="base-input__box">
            <component
                :id="id"
                :is="type"
                :type="input"
                :placeholder="placeholder"
                class="
                    base-input__user-input
                    base-input--is-reset
                "
            ></component>
            <span>icon</span>
        </section>
        <p class="base-input__user-message">Help Text</p>
    </fieldset>
</template>
<script setup lang="ts">
import { computed, useSlots, type PropType } from 'vue';
import { Fields, Types } from './types';
import useValidations from '@/components/validation/useValidation';

defineProps({
    /**
     * Set the unique id of the ui input
     */
    id: {
        type: String as PropType<string>,
        default: 'fieldID'
    },

    /**
     * Set type of user field [input, textarea]
     */
    type: {
        type: String as PropType<Fields>,
        default: Fields.INPUT,
        validator: (prop: Fields) => useValidations().validateValueCollectionExists({ collection: Fields, value: prop}),
    },

    /**
     * Set the type of input field [emai, file, password, submit, text, button]
     */
    input: {
        type: String as PropType<Types>,
        default: Types.TEXT,
        validator: (prop: Types) => useValidations().validateValueCollectionExists({ collection: Types, value: prop})
    },

    /**
     * Set the start placeholder value
     */
    placeholder: {
        type: String as PropType<string>,
        default: 'Add here your text'
    },

    /**
     * Set the required property
     */
    required: {
        type: Boolean as PropType<Boolean>,
        default: false,
    },

    /**
     * Set failed state
     */
     failed: {
        type: Boolean as PropType<Boolean>,
        default: false,
    }
})

const slots = useSlots();
const label = computed(() => !!slots['label']);
</script>
<style src="./BaseInput.scss" lang="scss"></style>