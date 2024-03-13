<template>
  <BaseTextarea
    :id="'textarea-1'"
    :label="'label one'"
    :placeholder="'Type your text...'"
    :helpText="helpText"
    :disabled="false"
    :text="'I was typing all day long...'"
    :maxLength="20"
    @textareaError="emitsError"
  ></BaseTextarea>
  <br />
  <BaseTextarea></BaseTextarea>
  <br />
  <BaseTextarea
    :id="'textarea-3'"
    :label="'label'"
    :placeholder="'Type your text...'"
    :helpText="'Do something!'"
    :disabled="true"
    :text="'I was typing all day long...'"
  ></BaseTextarea>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTextarea from './BaseTextarea.vue'

let helpText = ref('Type since you can...')

const emitsError = (error: any) => {
  console.log('error')
  helpText.value = error.error ? 'Max characters are 20' : 'Other message'
}
</script>

<style scoped></style>
