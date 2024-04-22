<template>
    <fieldset class="base-radio__fieldset" :disabled="disabled">
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
import { type UniqueId, type UIRadioOptions } from "./types"

const { options, name, disabled, modelValue } = defineProps({
    /**
     * Set the unique id of the ui toggle
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "radioId"
    },

    name: {
        type: String as PropType<string>,
        required: true
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    modelValue: {
        type: [String, Number],
        default: ""
    },
    options: {
        type: Array as PropType<UIRadioOptions[]>,
        default: () => []
    }
})

const emit = defineEmits(["update:modelValue"])

const emitChange = (value: any) => {
    emit("update:modelValue", value)
}
</script>

<style lang="scss" src="./BaseRadio.scss"></style>
