<template>
    <label
        :class="[
            'base-checkbox',
            `base-checkbox--is-${size}`
        ]"
        :title="label"
        :aria-label="label"
        @change="handleChange"
    >
        <input
            data-testID="ui-checkbox"
            ref="checkbox"
            type="checkbox"
            :checked="active"
            :indeterminate="indeterminate"
            :invalid="invalid"
            :variant="variant"
            :disabled="disabled"
            :aria-disabled="disabled"
            style="display: none"
        />
        <button
            @keyup.enter="setChangeByKey"
            @keyup.space="setChangeByKey"
            class="base-checkbox__square"
        >
            <!-- <span v-if="isChecked" class="base-checkbox--is-checked-icon">
                <Suspense>
                    <BaseIcon
                        :size="size"
                        :type="IconType.FEEDBACK"
                        :name="'IconFeedbackCheck'"
                    ></BaseIcon>
                </Suspense>
            </span>
            <span
                v-if="indeterminate && !isChecked"
                class="base-checkbox--is-indeterminate-icon"
            >
                <Suspense>
                    <BaseIcon
                        :type="IconType.EDIT"
                        :name="'IconEditRemoveMinus'"
                        :size="size"
                    ></BaseIcon>
                </Suspense>
            </span> -->
        </button>
        <slot />
    </label>
</template>
<script lang="ts" setup>
import { ref, type PropType } from "vue"
import { type UniqueId, Sizes } from "./types"
import { validateValueCollectionExists } from "@/components/utilities/validation/useValidation"

const { active, disabled, indeterminate } = defineProps({
    /**
     * Set the unique id of the ui checkbox
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "checkboxId"
    },
    /**
     * Set the checkbox size mode [M, S]
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
     * Set the disabled checkbox state
     */
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * Set variant type state (ALT)
     */
    variant: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * Set the indeterminate checkbox value
     */
    indeterminate: {
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
     * Set the invalid status
     */
    invalid: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const isChecked = ref(active)
const checkbox = ref<HTMLInputElement | null>(null)
const emits = defineEmits(["checked"])

const handleChange = (payload: Event) => {
    const { checked } = payload.target as HTMLInputElement
    isChecked.value = checked
    emits("checked", { cheked: checked, indeterminate: indeterminate })
}

const setChangeByKey = () => {
    if (disabled) return
    if (!checkbox.value) return
    const { checked } = checkbox.value
    checkbox.value.checked = !checked
    isChecked.value = checkbox.value.checked

    emits("checked", {
        checked: checkbox.value.checked,
        indeterminate: indeterminate
    })
}
</script>
<style src="./BaseCheckbox.scss" lang="scss"></style>
