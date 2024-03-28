<template>
    <label
        class="base-toggle"
        :title="label"
        :aria-label="label"
        @change="handleChange"
    >
        <!-- v-show="false" -->
        <input
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            :aria-disabled="disabled"
        >
        <span class="base-toggle__switch"></span>
        <slot />
    </label>
</template>
<script lang="ts" setup>
import { type PropType } from 'vue';

defineProps({
    /**
   * Set checked state
   */
  checked: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the disabled component state
   */
   disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Set the aria accesibility label
   */
   label: {
    type: String as PropType<string>,
    default: 'component label'
}
})

const emits = defineEmits(['checked'])

const handleChange = (payload: Event) => {
    const { checked } = (payload.target as HTMLInputElement)
    emits('checked', checked)
}
</script>
<style src="./BaseToggle.scss" lang="scss"></style>