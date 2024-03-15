<template>
    <fieldset :class="
        [
            'base-input__fieldset',
            'base-input--is-reset'
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

            <!-- <span>icono</span> -->
        </header>
        <section class="base-input__box">
            <input
                ref="field"
                :id="id"
                :name="id"
                :aria-required="required"
                :aria-placeholder="placeholder"
                type="text"
                :placeholder="placeholder"
                :required="required ?? undefined"
                :accept="accept ?? undefined"
                :title="title"
                :pattern="pattern"
                v-model.lazy="proxyValue" 
                autocomplete="one-time-code"
                aria-describedby="ui-message"
                class="
                    base-input__user-input
                    base-input--is-reset
                "
                @input="updateValue"
                @change="changeValue"
                @click="focus"
            />
            <!-- <span>icon</span> -->
        </section>
        <p
            v-if="message || error"
            id="ui-message"
            class="base-input__user-message"
        >
            <!-- @slot Slot for user alert -->
            <span class="base-input__user-message-alert"
>
                <slot name="error" />
            </span>

            <!-- @slot Slot for user message info -->
            <slot name="message" />
        </p>
    </fieldset>
</template>
<script setup lang="ts">
import { computed, onMounted, useSlots, type PropType } from 'vue';
import {  Types } from './types';
import useValidations from '@/components/validation/useValidation';

const proxyValue = defineModel()
const { pattern, modelValue } = defineProps({
    /**
     * Set the unique id of the ui input
     */
    id: {
        type: String as PropType<string>,
        default: 'fieldID'
    },

    modelValue: {
        type: String as PropType<string>
    },

    /**
     * Set the type of input field [email, file, password, submit, text, button]
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
        type: String as PropType<string>
    },

    /**
     * Set the required property
     */
    required: {
        type: Boolean,
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
     * Set allowed input pattern [example: [A-Za-z0-9_]{5,}]
     */
    pattern: {
        type: String as PropType<string>
    },

    /**
     * Set accepted file [example: image/jpeg,image/gif,image/png,application/pdf]
     */
    accept: {
        type: String as PropType<string>
    },

    /**
     * Set title value for input field
     */
     title: {
        type: String as PropType<string>,
        default: 'Write your value'
    }
    
})

const slots = useSlots();
const label = computed(() => !!slots['label']);
const message = computed(() => !!slots['message']);
const error = computed(() => !!slots['error']);
// const settedValue = computed(() => modelValue)
const customEmits = defineEmits(['update:modelValue', 'change', 'focus', 'invalid']);
const updateValue = (payload: Event) => {
    const { value } = (payload.target as HTMLInputElement)
    customEmits('update:modelValue', value)
    invalidModel(value)
};

const invalidModel = (value: string): void => {
    if(!pattern) return;
    const re = new RegExp(pattern)
    customEmits('invalid', value === '' ? false : !re.test(value))
}

const changeValue = (payload: Event) => customEmits('change', { target: payload.target });
const focus = () => customEmits('focus')

onMounted(() => modelValue ? invalidModel(modelValue) : null)
</script>
<style src="./BaseInput.scss" lang="scss"></style>