<template>
  <BaseTextarea
    :label="'label one'"
    :className="'test'"
    :placeholder="'Type your text...'"
    :helpText="'Do something!'"
    :disabled="false"
    :text="'I was typing all day long...'"
    :maxLength="20"
  ></BaseTextarea>
  <BaseTextarea
    :label="'label active'"
    :className="'test active'"
    :placeholder="'Type your text...'"
    :helpText="'Do something!'"
    :disabled="false"
    :text="'I was typing all day long...'"
  ></BaseTextarea>
  <BaseTextarea
    :label="'label'"
    :className="'test'"
    :placeholder="'Type your text...'"
    :helpText="'Do something!'"
    :disabled="true"
    :text="'I was typing all day long...'"
  ></BaseTextarea>
</template>

<script setup lang="ts">
import BaseTextarea from './BaseTextarea.vue'
</script>

<style scoped></style>
