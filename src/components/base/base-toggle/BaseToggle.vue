<template>
    <label
        :class="[
            'base-toggle',
            `base-toggle--is-${size}`,
            `${variant ? `base-toggle--is-ALT` : ''}`,
            { 'base-toggle--is-full-width': fullWidth }
        ]"
        :title="label"
        :aria-label="label"
        @change="handleChange"
        :dir="rtl ? 'rtl' : 'ltr'"
    >
        <input
            data-testID="ui-checkbox"
            ref="checkbox"
            type="checkbox"
            :checked="active"
            :disabled="disabled"
            :aria-disabled="disabled"
            style="display: none"
        />
        <button
            class="base-toggle__switch"
            dir="ltr"
            @keyup.enter="setChangeByKey"
            @keyup.space="setChangeByKey"
        />
        <slot />
    </label>
</template>
<script lang="ts" setup>
import { ref, type PropType } from "vue"
import { type UniqueId, Sizes } from "./types"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"

const { disabled, id } = defineProps({
    /**
     * Set the unique id of the ui toggle
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "toggleId"
    },
    /**
     * Set the toggle size mode [M, S]
     */
    size: {
        type: String as PropType<Sizes>,
        default: Sizes.M,
        validator: (prop: Sizes) =>
            validateValueCollectionExists({ collection: Sizes, value: prop })
    },
    /**
     * Set checked state
     */
    active: {
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
     * Set variant type state
     */
    variant: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * Set the aria accesibility label
     */
    label: {
        type: String as PropType<string>,
        default: "component label"
    },
    /**
     * Set full width for the label
     */
    fullWidth: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * Set change order for the label
     */
    rtl: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const emits = defineEmits(["checked"])
const checkbox = ref<HTMLInputElement | null>(null)

const handleChange = (payload: Event) => {
    const { checked } = payload.target as HTMLInputElement
    emits("checked", { [id]: checked })
}

const setChangeByKey = () => {
    if (disabled) return
    if (!checkbox.value) return
    const { checked } = checkbox.value
    checkbox.value.checked = !checked
    emits("checked", { [id]: checkbox.value.checked })
}
</script>
<style src="./BaseToggle.scss" lang="scss"></style>
