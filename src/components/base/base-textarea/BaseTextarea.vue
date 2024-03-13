<template>
  <div class="base-textarea">
    <!--Header-->
    <div class="base-textarea_header">
      <span class="label">
        {{ label }}
      </span>
      <span class="question-mark">
        <base-icon :name="'IconFeedbackAnswer'" :type="IconType.FEEDBACK"></base-icon>
      </span>
    </div>
    <!--wrapper-->
    <div class="base-textarea_wrapper">
      <textarea
        class="textarea"
        :value="text"
        :class="classes && `${hasError ? 'error' : ''}`"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateCharacterCount"
      ></textarea>
      <div class="clear-text" v-if="!disabled" @click="clearTextarea">
        <base-icon :name="'IconEditCleanCircle'" :type="IconType.EDIT"> </base-icon>
      </div>
    </div>
    <!--footer -->
    <div class="base-textarea_footer">
      <div class="help-text">
        <div class="icon-error">
          <base-icon
            v-if="hasError"
            :name="'IconFeedbackError'"
            :type="IconType.FEEDBACK"
          ></base-icon>
        </div>
        {{ helpText }}
      </div>
      <div class="counter">{{ characterCount }} / {{ max }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import BaseIcon from './../base-icon/BaseIcon.vue'
import { IconType } from './../base-icon/type'

interface TextareaProps {
  label?: string
  className?: string
  placeholder?: string
  helpText?: string
  disabled?: boolean
  text?: string
  maxLength?: any
}

const props = withDefaults(defineProps<TextareaProps>(), {
  maxLength: 260
})
const text = ref(props.text)
const max = ref(props.maxLength)
const characterCount = ref(0)
let hasError = ref(false)
const classes = ref(`${props.className} ${props.disabled ? 'disabled' : ''}`)

watchEffect(() => {
  if (props.text && props.text.length > 0) {
    text.value = props.text
    characterCount.value = props.text.length
  }
})

const updateCharacterCount = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  text.value = target.value
  characterCount.value = target.value.length

  hasError.value = target.value.length > max.value
}

const clearTextarea = () => {
  text.value = ''
  characterCount.value = 0
}
</script>

<style lang="scss" src="./BaseTextarea.scss"></style>
