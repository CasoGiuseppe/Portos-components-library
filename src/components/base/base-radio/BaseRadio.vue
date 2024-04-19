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

<style lang="scss">
.base-radio {
    &__fieldset {
        border: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    &__wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    &__option {
        display: flex;
        align-items: center;
    }

    &__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .base-radio__label:before {
        }
    }
}

.base-radio__label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        background-color: #fff;
    }

    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: transparent;
        opacity: 0;
    }

    .base-radio__input:checked + &:after {
        background-color: #007bff;
        opacity: 1;
    }
}
</style>
