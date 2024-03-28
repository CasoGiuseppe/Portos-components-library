<template>
    <label class="base-toggle">
        <!-- v-show="false" -->
        <input
            type="checkbox"
            :checked="checked"
        >
        <span class="base-toggle__switch"></span>
        <slot />
    </label>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
    /**
   * Set checked state
   */
  checked: {
    type: Boolean as PropType<boolean>,
    default: true
  },
})
</script>