<template>
  <section>
    <BaseTextarea required>
      <template #label> Slot label </template>
      <template #clear>
        <Suspense><BaseIcon id="IconEditCleanCircle" name="IconEditCleanCircle" type="edit" /></Suspense>
      </template>
      <template #error>
        <Suspense><BaseIcon id="IconFeedbackError" name="IconFeedbackError" type="feedback" size="XS" /></Suspense> mensaje error
      </template>
      <template #message>this is my message</template>
    </BaseTextarea>
  </section>
</template>

<script setup lang="ts">
import BaseTextarea from './components/base/base-textarea/BaseTextarea.vue';
</script>
