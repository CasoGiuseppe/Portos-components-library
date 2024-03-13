<template>
    <fieldset :class="
        [
            'base-input__fieldset',
            'base-input--is-reset',
            `${failed ? 'base-input--is-failed' : ''}`
        ]"

        :disabled="disabled"
    >
        <header class="base-input__header">
            <label
                v-if="label"
                class="base-input__label"
                :data-required="!required ? '(optional)' : null"
                :for="id"
            >
                <!-- @slot Slot for input label -->
                <slot name="label" />
            </label>

            <span>icono</span>
        </header>
        <section class="base-input__box">
            <component
                :id="id"
                :name="id"
                :is="type"
                :aria-required="required"
                :aria-placeholder="placeholder"
                :aria-invalid="failed"
                :type="input"
                :placeholder="placeholder"
                :required="required"
                :value="model"
                autocomplete="one-time-code"
                aria-describedby="ui-message"
                class="
                    base-input__user-input
                    base-input--is-reset
                "
            ></component>
            <span>icon</span>
        </section>
        <p
            v-if="message"
            id="ui-message"
            class="base-input__user-message"
        >
            <!-- @slot Slot for user message -->
            <slot name="message" />
        </p>
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
     * Set the input value
     */
    model: {
        type: String as PropType<string>
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
     * Handle disabled state
     */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
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
const message = computed(() => !!slots['message']);
</script>
<style src="./BaseInput.scss" lang="scss"></style>