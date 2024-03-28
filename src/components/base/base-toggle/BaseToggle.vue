<template>
    <label
        class="base-toggle"
        @change="handleChange"
    >
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
import { ref, type PropType } from 'vue';

defineProps({
    /**
   * Set checked state
   */
  checked: {
    type: Boolean as PropType<boolean>,
    default: true
  },
})

const emits = defineEmits(['checked'])

const handleChange = (payload: Event) => {
    const { checked } = (payload.target as HTMLInputElement)
    emits('checked', checked)
}
</script>
<style src="./BaseToggle.scss" lang="scss"></style>