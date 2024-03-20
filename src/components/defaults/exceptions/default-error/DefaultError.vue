<template>
    <!-- get error message from error attribute -->
    <aside :id="id" class="default-error">
        <IconFeedbackError />
        <slot name="message">UPS! something was wrong</slot>
    </aside>
  </template>
  <script setup lang="ts">
  import { type PropType } from 'vue';
  import { IconFeedbackError } from '@ui/icons';
  const { id } = defineProps({
    /**
     * Set the unique id of the default errror message
     */
    id: {
      type: String as PropType<string>,
      default: 'errorID'
    }
  });
  </script>
  <style lang="scss" src="./DefaultError.scss" scoped />