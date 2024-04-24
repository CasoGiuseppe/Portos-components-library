<template>
    <fieldset
        :class="['base-radio', `base-radio--is-${size}`]"
        :style="`flex-direction:${direction}`"
    >
        <section
            v-for="(option, index) in options"
            :key="index"
            class="base-radio__option"
        >
            <input
                :id="`${id}-${index}`"
                class="base-radio__input"
                type="radio"
                data-testID="ui-checkbox"
                :name="name"
                :value="option.value"
                :checked="option.value === modelValue"
                :variant="variant"
                :disabled="option.disabled || disabled"
                :aria-disabled="option.disabled || disabled"
                @change="emitChange(option.value)"
            />
            <label :for="`${id}-${index}`" class="base-radio__label">{{
                option.label
            }}</label>
        </section>
    </fieldset>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from "vue"
import {
    type UniqueId,
    type UIRadioOptions,
    UIRadioDirection,
    Sizes
} from "./types"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"

const { options, name, disabled, modelValue, direction } = defineProps({
    /**
     * Set the unique id of the ui toggle
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "radioId"
    },

    /**
     * Set the name for the radio group
     */
    name: {
        type: String as PropType<string>,
        required: true
    },
    /*
     * Set if the fieldset should be disabled
     */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /*
     * Allows to pass the model value
     */
    modelValue: {
        type: [String, Number],
        default: ""
    },
    /*
     * Set the radio input options as UIRadioOptions (label, value, disabled)
     */
    options: {
        type: Array as PropType<UIRadioOptions[]>,
        default: () => []
    },
    /**
     * Set the direction for radio group (row, column)
     */
    direction: {
        type: String as PropType<UIRadioDirection>,
        default: UIRadioDirection.ROW,
        validator: (prop: UIRadioDirection) =>
            validateValueCollectionExists({
                collection: UIRadioDirection,
                value: prop
            })
    },
    /**
     * Set the radio size mode [M, S]
     */
    size: {
        type: String as PropType<Sizes>,
        default: Sizes.M,
        validator: (prop: Sizes) =>
            validateValueCollectionExists({ collection: Sizes, value: prop })
    },
    /**
     * Set variant type state
     */
    variant: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const emit = defineEmits(["update:modelValue"])

const emitChange = (value: any) => {
    emit("update:modelValue", value)
}
</script>

<style lang="scss" src="./BaseRadio.scss"></style>
