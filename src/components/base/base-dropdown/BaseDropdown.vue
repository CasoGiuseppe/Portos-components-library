<template>
	<div
		class="base-dropdown"
		:data-active="isActive"
		:data-error="hasError"
		:data-disabled="isDisabled"
		v-click-outside="toggleDropdown"
	>
		<div class="base-dropdown--header">
			<slot
				name="header"
				:label="label"
			/>
		</div>

		<button
			class="base-dropdown--button"
			:disabled="isDisabled"
			@click="toggleDropdown"
			@keydown.arrow-down.prevent="isActive = true"
			@keydown.arrow-up.prevent="isActive = false"
		>
			<p
				v-text="selectedOption?.label || placeholder"
				:data-checked="!!selectedOption"
				class="base-dropdown--button-placeholder"
			/>
			<i class="base-dropdown--button-icon" />
		</button>

		<slot
			name="options"
			:isActive="isActive"
			:toggleDropdown="toggleDropdown"
		/>

		<div class="base-dropdown--footer">
			<slot
				name="footer"
				:error="error"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { type IBaseDropdownComponent } from './types';

const isActive = ref<boolean>(false);
const hasError = ref<boolean>(false);
const isDisabled = ref<boolean>(false);
const error = ref<string>('Error text');

const props = withDefaults(defineProps<IBaseDropdownComponent>(), {
  	placeholder: 'Select your option',
	label: ''
});

watch(() => props.selectedOption, newSelectedOption => {
	if (newSelectedOption && isActive) {
		toggleDropdown();
	}
});

const toggleDropdown = () => {
	isActive.value = !isActive.value
};
</script>

<style lang="scss" src="./BaseDropdown.scss" />