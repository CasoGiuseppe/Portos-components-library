<template>
    <fieldset :class="
        [
            'base-input__fieldset',
            'base-input--is-reset',
            `base-input--is-${input}`
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
                data-testID="ui-input"
                :id="id"
                :name="id"
                :aria-required="required"
                :aria-placeholder="placeholder"
                :type="input"
                :placeholder="placeholder"
                :required="required ?? undefined"
                :accept="accept ?? undefined"
                :title="title"
                :pattern="pattern"
                :maxlength="maxLength"
                v-model.lazy="value" 
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
            <button
                v-if="submit"
                data-testID="ui-input-submit"
                class="base-input__submit"
                :disabled="hasEmptyModel"
                @click="submitAction"
            >
                <slot name="submit" />
            </button>
        </section>
        <p
            v-if="message || error"
            data-testID="ui-input-message"
            class="base-input__user-message"
        >
            <!-- @slot Slot for user alert -->
            <span
                v-if="error"
                data-testID="ui-input-error"
                class="base-input__user-message-alert"
>
                <slot name="error" />
            </span>

            <!-- @slot Slot for user message info -->
            <slot name="message" />
        </p>
    </fieldset>
</template>
<script setup lang="ts">
import { computed, useSlots, type PropType } from 'vue';
import {  Types } from './types';
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation';

const value = defineModel('proxyValue')
const { pattern, required } = defineProps({
    /**
     * Set the unique id of the ui input
     */
    id: {
        type: String as PropType<string>,
        default: 'fieldID'
    },

    /**
     * v-model value
     */
    proxyValue: {
        type: String as PropType<string>
    },

    /**
     * Set the type of input field [email, file, password, submit, text, button]
     */
    input: {
        type: String as PropType<Types>,
        default: Types.TEXT,
        validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop})
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
    },

    /**
     * Set max input length value
     */
    maxLength: {
        type: Number as PropType<number>
    }
    
})

const slots = useSlots();
const label = computed(() => !!slots['label']);
const message = computed(() => !!slots['message']);
const error = computed(() => !!slots['error']);
const submit = computed(() => !!slots['submit']);

const customEmits = defineEmits(['update:modelValue', 'change', 'focus', 'invalid', 'send']);
const hasEmptyModel = computed(():boolean => {
    if(!value.value) return true
    return (value.value as string).length === 0
});

const updateValue = (payload: Event) => {
    const { value } = (payload.target as HTMLInputElement)
    customEmits('update:modelValue', value)

    requiredModel(value.length === 0);
    invalidModel(value);
};

const requiredModel = (state: boolean) => {
    if(required) customEmits('invalid', { mode: 'required', value: state });
}

const invalidModel = (value: string): void => {
    if(!pattern) return;
    if(value.length === 0) return;
    const re = new RegExp(pattern)
    customEmits('invalid', {mode: 'validation', value: !re.test(value) })
}

const changeValue = (payload: Event) => customEmits('change', { target: payload.target });
const focus = () => customEmits('focus')

const submitAction = () => customEmits('send')
</script>
<style src="./BaseInput.scss" lang="scss"></style>@/components/utilities/validation/useValidation