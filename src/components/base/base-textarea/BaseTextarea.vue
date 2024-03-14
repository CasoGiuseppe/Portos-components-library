<template>
  <div class="base-textarea">
    <!--Header-->
    <div class="base-textarea--header">
      <span class="base-textarea--header-label">
        {{ label }}
      </span>
      <div class="base-textarea--header-question_mark" @click="showHelp = !showHelp">
        <base-icon :name="'IconFeedbackAnswer'" :type="Types.FEEDBACK" :size="Sizes.S"></base-icon>
      </div>
    </div>
    <!--wrapper-->
    <div class="base-textarea--wrapper">
      <textarea
        :id="id"
        :value="text"
        :class="['base-textarea--wrapper-textarea', `${hasError ? 'error' : ''}`]"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="updateCharacterCount"
      ></textarea>
      <div class="base-textarea--wrapper-clear_text" v-if="!disabled" @click="clearTextarea">
        <base-icon :name="'IconEditCleanCircle'" :type="Types.EDIT" :size="Sizes.S"> </base-icon>
      </div>
    </div>
    <!--footer -->
    <div class="base-textarea--footer">
      <div class="base-textarea--footer-help_area">
        <div class="base-textarea--footer-help_area-icon_error">
          <base-icon
            v-if="hasError && showHelp"
            :name="'IconFeedbackError'"
            :type="Types.FEEDBACK"
            :size="Sizes.XS"
          ></base-icon>
        </div>
        <div
          class="base-textarea--footer-help_area-help_text"
          v-if="showHelp"
          :class="hasError ? 'error' : ''"
        >
          {{ helpText }}
        </div>
      </div>
      <div class="base-textarea--footer-counter">{{ characterCount }} / {{ max }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watchEffect, type PropType } from 'vue'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '@ui/base/base-icon/types'
import type { TextareaProps } from '@ui/base/base-textarea/models/baseTextarea'

const { id, label, placeholder, helpText, disabled, maxLength }: TextareaProps = defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<string>,
    default: 'textareaId'
  },
  /**
   * Set label for the ui textarea
   */
  label: {
    type: String,
    default: 'Label'
  },
  /**
   * Set placeholder for the ui textarea
   */
  placeholder: {
    type: String,
    default: 'Write something here!...'
  },
  /**
   * Set the help text when user click on help icon
   */
  helpText: {
    type: String,
    default: 'Help text'
  },
  /**
   * Set max number characters on ui textarea to show error
   */
  maxLength: {
    type: Number,
    default: 260
  },
  /**
   * Sets if the ui textarea is disabled
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

const text = ref('')
const max = ref(maxLength)
const characterCount = ref(0)
const emitsError = defineEmits(['textareaError'])
let hasError = ref(false)
let showHelp = ref(false)

watchEffect(() => {
  if (hasError.value) {
    emitsError('textareaError', { error: 'TEXT_SIZE_EXCEEDED' })
  }
})

const updateCharacterCount = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  text.value = target.value
  characterCount.value = target.value.length
  hasError.value = characterCount.value > max.value
  if (hasError.value) {
    showHelp.value = true
  }
}

const clearTextarea = () => {
  text.value = ''
  characterCount.value = 0
  hasError.value = characterCount.value > max.value
  if (showHelp.value) showHelp.value = false
}
</script>

<style lang="scss" src="./BaseTextarea.scss"></style>
