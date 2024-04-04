<template>
  <fieldset class="base-textarea">
    <!--Header-->
    <header class="base-textarea--header">
      <section class="base-textarea--header-box">
        <!-- main header label -->
        <label class="base-textarea--header-label">
          <!-- @slot Slot for optional info -->
          <slot v-if="label" name="label" />
        </label>

        <!-- optional message -->
        <span v-if="!required" class="base-textarea--header-label_optional">
          <!-- @slot Slot for optional info -->
          <slot name="optional" />
          {{ optional ? '' : '(optional)' }}
        </span>
      </section>
    </header>

    <!--main-->
    <section class="base-textarea--box">
      <textarea
        ref="textarea"
        :id="id"
        class="base-textarea--box-textarea"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :rows="rows"
        v-model.lazy="value"
        @input="updateValue"
        @change="changeValue"
      ></textarea>

      <Transition name="appear-clear-button">
        <button
          v-if="!disabled && value && clear"
          data-testID="ui-textarea-clear"
          class="base-textarea--box-clear"
          @click="clearTextarea"
        >
          <!-- @slot for clear icon-->
          <slot name="clear" />
        </button>
      </Transition>
    </section>

    <!--footer -->
    <footer class="base-textarea--footer">
      <p
        v-if="message || error"
        data-testID="ui-textarea-message"
        class="base-textarea__user-message"
      >
        <span
          v-if="error"
          data-testID="ui-textarea-error"
          class="base-textarea__user-message-alert"
        >
          <!-- @slot Slot for user alert -->
          <slot name="error" />
        </span>

        <!-- @slot Slot for user message info -->
        <slot v-if="message" name="message" />
      </p>

      <!--counter -->
      <div v-if="maxLength" class="base-textarea--footer-counter">
        {{ counterUserMesssage }}
      </div>
    </footer>
  </fieldset>
</template>

<script lang="ts" setup>
import { defineEmits, useSlots, computed, type PropType } from 'vue'
import type { ITextareaComponent } from './types'

const {
  id,
  placeholder,
  disabled,
  maxLength,
  required
}: ITextareaComponent = defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<string>,
    default: 'textareaId'
  },
  /**
   * v-model value
   */
  proxyValue: {
    type: String as PropType<string>
  },
  /**
   * Set placeholder for the ui textarea
   */
  placeholder: {
    type: String as PropType<string>,
    default: 'Type your text...'
  },
  /**
   * Set max number characters on ui textarea to show error
   */
  maxLength: {
    type: Number as PropType<number>
  },
  /**
   * Sets if the ui textarea is disabled
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Sets if ui textarea is a required field
   */
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set numer of text areas rows to set element height
   */
   rows: {
    type: Number as PropType<number>,
    default: 3
  }
})

// slots
const slots = useSlots()
const label = computed(() => !!slots['label'])
const optional = computed(() => !!slots['optional'])
const error = computed(() => !!slots['error'])
const message = computed(() => !!slots['message'])
const clear = computed(() => !!slots['clear'])

// emits
const customEmits = defineEmits([
  'update:modelValue',
  'cleared',
  'change',
  'focus',
  'invalid',
])

const value = defineModel<string>('proxyValue')

const counterUserMesssage = computed(() => `${(value.value || '').length}/${maxLength}`)
const updateValue = (payload: Event) => {
  const { value: targetValue } = (payload.target as HTMLInputElement)
  value.value = targetValue;
  customEmits('update:modelValue', value);
  requiredModel(value.value.length === 0)
}

const clearTextarea = () => {
  value.value = ''

  customEmits('cleared')
  requiredModel(value.value.length === 0)
}

const requiredModel = (state: boolean) => {
  if (required) customEmits('invalid', { mode: 'required', value: state })
}

const changeValue = (payload: Event) => customEmits('change', { target: payload.target })
</script>

<style lang="scss" src="./BaseTextarea.scss"></style>
