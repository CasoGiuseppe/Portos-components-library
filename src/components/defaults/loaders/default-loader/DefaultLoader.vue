<template>
    <aside :id="id" class="default-loader">
      <IconCalendarAlarm />
      <!-- @slot Default slot laoding message -->
      <slot>wait a moment please...</slot>
    </aside>
  </template>
  <script setup lang="ts">
  import { type PropType } from 'vue';
  import { IconCalendarAlarm } from '@ui/icons';
  const { id } = defineProps({
    /**
     * Set the unique id of the default loading message
     */
    id: {
      type: String as PropType<string>,
      default: 'loaderID'
    }
  });
  </script>
  <style lang="scss" src="./DefaultLoader.scss" scoped />