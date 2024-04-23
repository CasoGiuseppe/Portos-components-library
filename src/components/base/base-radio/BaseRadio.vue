<template>
    <fieldset
        :class="[
            'base-radio',
            `base-radio--is-${size}`,
            `${variant ? `base-radio--is-ALT` : ''}`
        ]"
        :style="`flex-direction:${direction}`"
    >
        <legend v-if="false"></legend>
        <section
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
        </section>
    </fieldset>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, type PropType, onMounted } from "vue"
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
    },
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

onMounted(() => {
    console.log(options)
})
</script>

<style lang="scss" src="./BaseRadio.scss"></style>
