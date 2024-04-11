<template>
	<div
		class="base-dropdown"
		:data-active="isActive"
		:data-error="hasError"
		:data-disabled="isDisabled"
	>
		<div class="base-dropdown--header">
			<slot name="header" :label="label" />
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

		<ul
			v-if="isActive"
			class="base-dropdown--options"
		>
			<slot
				name="options"
				:selectOption="selectOption"
				:selectedOption="selectedOption?.label"
			/>
		</ul>

		<div class="base-dropdown--footer">
			<slot
				name="footer"
				:error="error"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
	type IDropdownOption,
	type IBaseDropdownComponent
} from './types';

const selectedOption = ref<IDropdownOption>();
const isActive = ref<boolean>(false);
const hasError = ref<boolean>(false);
const isDisabled = ref<boolean>(false);
const error = ref<string>('Error text');

withDefaults(defineProps<IBaseDropdownComponent>(), {
  placeholder: 'Select your option',
	label: ''
});

const toggleDropdown = () => {
	isActive.value = !isActive.value
};

const selectOption = (option: IDropdownOption) => {
	selectedOption.value = option;

	toggleDropdown();
};
</script>

<style lang="scss" src="./BaseDropdown.scss" />