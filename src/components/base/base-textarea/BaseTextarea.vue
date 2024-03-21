<template>
  <fieldset class="base-textarea">
    <!--Header-->
    <header class="base-textarea--header">
      <section class="base-textarea--header-box">
        <!-- main header label -->
        <h6 class="base-textarea--header-label">
          <slot v-if="label" name="label" />
        </h6>

        <!-- optional message -->
        <span v-if="!required" class="base-textarea--header-label_optional">
          <!-- @slot Slot for optional info -->
          <slot name="optional" />
          {{ optional ? '' : '(optional)' }}
        </span>
      </section>

      <button
        v-if="iconHelp && message"
        class="base-textarea--header-question_mark"
        @click="showHelp = !showHelp"
      >
        <!-- @slot for help button-->
        <suspense>
          <slot name="iconHelp" />
        </suspense>
      </button>
    </header>

    <!--main-->
    <main class="base-textarea--box">
      <textarea
        :id="id"
        v-model.lazy="value"
        :class="['base-textarea--box-textarea', `${hasError ? 'error' : ''}`]"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :maxlength="max"
        @input="updateValue"
        @change="changeValue"
      ></textarea>

      <div class="base-textarea--box-clear_text" v-if="!disabled && value" @click="clearTextarea">
        <!-- @slot for clear icon-->
        <suspense>
          <slot name="iconClear" />
        </suspense>
      </div>
    </main>

    <!--footer -->
    <footer class="base-textarea--footer">
      <div class="base-textarea--footer-help_area">
        <p
          v-if="message || error"
          data-testID="ui-textarea-message"
          class="base-textarea__user-message"
        >
          <!-- @slot Slot for user alert -->
          <span
            v-if="error && hasError"
            data-testID="ui-textarea-error"
            class="base-textarea__user-message-alert"
          >
            <slot name="error" />
          </span>

          <!-- @slot Slot for user message info -->
          <slot v-if="showHelp" name="message" />
        </p>
      </div>
      <div v-if="max" class="base-textarea--footer-counter">
        {{ value ? value.length : 0 }} / {{ max }}
      </div>
    </footer>
  </fieldset>
</template>

<script lang="ts" setup>
import { defineEmits, useSlots, computed, ref, watchEffect, type PropType } from 'vue'
import type { ITextareaComponent } from '@ui/base/base-textarea/types'

const {
  id,
  placeholder,
  disabled,
  maxLength,
  minLength,
  required
  // proxyValue
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
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Set placeholder for the ui textarea
   */
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Set max number characters on ui textarea to show error
   */
  maxLength: {
    type: Number as PropType<number>
  },
  /**
   * Set max number characters on ui textarea to show error
   */
  minLength: {
    type: Number as PropType<number>,
    default: 0
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
  }
})

// slots
const slots = useSlots()
const label = computed(() => !!slots['label'])
const optional = computed(() => !!slots['optional'])
const iconHelp = computed(() => !!slots['iconHelp'])
const error = computed(() => !!slots['error'])
const message = computed(() => !!slots['message'])

// emits
const customEmits = defineEmits(['update:modelValue', 'cleared', 'change', 'focus', 'invalid'])

const value = defineModel<string>('proxyValue')

// refs
const max = ref(maxLength)
const min = ref(minLength)
let hasError = ref(false)
let showHelp = ref(false)

const setError = () => {
  if (!value.value && required) {
    hasError.value = true
    return
  }

  hasError.value = required && typeof value.value === 'string' && value.value.length <= min.value
}

watchEffect(() => {
  setError()
})

const updateValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  value.value = target.value

  hasError.value = value.value.length > max.value

  //emits
  customEmits('update:modelValue', value)
  !value.value && requiredModel()
}

const clearTextarea = () => {
  value.value = ''
  if (showHelp.value) showHelp.value = false

  customEmits('cleared', { cleared: true })
  requiredModel()
}

const requiredModel = () => {
  if (required) customEmits('invalid', { mode: 'required', value: true })
}

const changeValue = (payload: Event) => customEmits('change', { target: payload.target })
</script>

<style lang="scss" src="./BaseTextarea.scss"></style>
