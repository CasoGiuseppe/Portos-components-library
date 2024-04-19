<template>
    <fieldset class="base-radio__fieldset" :disabled="disabled">
        <legend v-if="$slots['legend']" class="base-radio__legend">
            <!-- @slot Slot for the legend of the radio group -->
            <slot name="legend" />
        </legend>
        <div class="base-radio__wrapper">
            <div
                v-for="(option, index) in options"
                :key="index"
                class="base-radio__option"
            >
                <input
                    :id="`${id}-${index}`"
                    :value="option.value"
                    :name="name"
                    type="radio"
                    :checked="option.value === modelValue"
                    :disabled="option.disabled || disabled"
                    @change="emitChange(option.value)"
                    class="base-radio__input"
                />
                <label :for="`${id}-${index}`" class="base-radio__label">{{
                    option.label
                }}</label>
            </div>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from "vue"

const props = defineProps({
    id: {
        type: String,
        default: "radio"
    },
    name: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number],
        default: ""
    },
    options: {
        type: Array as PropType<any>,
        default: () => []
    }
})

const emit = defineEmits(["update:modelValue"])

const emitChange = (value: any) => {
    emit("update:modelValue", value)
}
</script>

<style lang="scss" src="./BaseRadio.scss"></style>
