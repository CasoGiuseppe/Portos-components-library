<template>
  <label
    :class="[
      'base-checkbox',
      `base-checkbox--is-${size}`,
      `${variant ? `base-checkbox--is-ALT` : ''}`,
      `${isChecked ? `base-checkbox--is-${status}-checked` : `base-checkbox--is-${status}`}`
    ]"
    :title="label"
    :aria-label="label"
    :for="id"
  >
    <input
      :id="id"
      data-testID="ui-checkbox"
      ref="checkbox"
      type="checkbox"
      :checked="active"
      :disabled="disabled"
      :aria-disabled="disabled"
      style="display: none"
    />
    <button
      :disabled="disabled"
      class="base-checkbox__square"
      @click="handleChange"
      @keydown.enter="handleChange"
      @keydown.space="handleChange"
    >
      <span v-if="isChecked" class="base-checkbox--is-checked-icon">
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
    </button>
    <slot />
  </label>
</template>
<script lang="ts" setup>
import { ref, type PropType } from 'vue'
import { type UniqueId, Sizes } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'
import BaseIcon from '../base-icon/BaseIcon.vue'
import { Types as IconType } from '@/components/base/base-icon/types'
import { Types } from './types'
const { disabled, indeterminate } = defineProps({
  /**
   * Set the unique id of the ui checkbox
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'checkboxId'
  },
  /**
   * Set the checkbox size mode [M, S]
   */
  size: {
    type: String as PropType<Sizes>,
    default: Sizes.M,
    validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop })
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
   * Set variant type state
   */
  variant: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  indeterminate: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the aria accesibility label
   */
  label: {
    type: String as PropType<string>,
    default: 'component label'
  },
  status: {
    type: String as PropType<Types>,
    default: Types.DEFAULT,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  }
})

const isChecked = ref(false)
const emits = defineEmits(['checked'])
const checkbox = ref<HTMLInputElement | null>(null)

const handleChange = (payload: Event) => {
  isChecked.value = !isChecked.value
  emits('checked', isChecked.value)
}
</script>
<style src="./BaseCheckbox.scss" lang="scss"></style>
