<template>
  <input type="text" />
  <fieldset>
    <input
      tabindex="-1"
      style="height: 0; width: 0; display: none"
      :id="id"
      type="checkbox"
      :checked="modelValue"
      :disabled="isDisabled"
      :indeterminate="indeterminate"
      @change="handleChange"
    />
    <label
      :for="id"
      class="wrapper"
      :class="[`${variant ? `base-checkbox__label-ALT` : `base-checkbox__label`}`]"
    >
      <div
        tabindex="0"
        @keydown.enter="modelValue = !modelValue"
        @keydown.space="modelValue = !modelValue"
        :class="[
          'base-checkbox',
          `base-checkbox--is-${size}`,
          `${variant ? `base-checkbox--is-${status}-ALT` : `base-checkbox--is-${status}`}`,
          `${modelValue ? `base-checkbox--is-${status}-checked` : `base-checkbox--is-${status}`}`,
          {
            'base-checkbox--is-checked': modelValue,
            'base-checkbox--is-disabled': isDisabled,
            'base-checkbox--is-intremediate': indeterminate
          }
        ]"
      >
        <span v-if="modelValue" class="base-checkbox--is-checked-icon">
          <Suspense>
            <BaseIcon
              v-if="indeterminate"
              :type="IconType.EDIT"
              :name="'IconEditRemoveMinus'"
              :size="size"
            ></BaseIcon>
            <BaseIcon
              v-else
              :size="size"
              :type="IconType.FEEDBACK"
              :name="'IconFeedbackCheck'"
            ></BaseIcon>
          </Suspense>
        </span>
      </div>
      <slot name="label" />
    </label>
  </fieldset>

  <label class="wrapper flex items-center">
    <slot name="label"></slot>
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="modelValue"
      indeterminate
    />
    <span class="checkmark"></span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue'
import BaseIcon from '../base-icon/BaseIcon.vue'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'
import { Types as IconType } from '../base-icon/types'
import { Types, Sizes, type UniqueId } from './types'

const { id, status, isChecked, isDisabled, indeterminate } = defineProps({
  /**
   * Set the unique id of the ui checkbox
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'checkboxId'
  },
  /**
   * Set the checkbox type family [default, warning, damage]
   */
  status: {
    type: String as PropType<Types>,
    default: Types.DEFAULT,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  },
  /**
   * Set the checkbox size family [S, M]
   */
  size: {
    type: String as PropType<Sizes>,
    default: Sizes.M,
    validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop })
  },

  variant: Boolean as PropType<boolean>,
  isChecked: Boolean as PropType<boolean>,
  indeterminate: Boolean as PropType<boolean>,
  isDisabled: Boolean as PropType<boolean>
})

const modelValue = ref(false)
const customEmits = defineEmits(['update:modelValue', 'change'])
const handleChange = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).checked
  customEmits('update:modelValue', modelValue.value)
  //customEmits('change', modelValue.value)
}
</script>

<style src="./BaseCheckbox.scss" lang="scss"></style>
