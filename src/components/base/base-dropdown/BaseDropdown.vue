<template>
	<div
		class="base-dropdown"
		data-testID="ui-dropdown"
		:data-active="isActive"
		:data-error="!!error"
		:data-disabled="isDisabled"
		v-click-outside="closeList"
	>
		<div class="base-dropdown__header">
			<slot name="header" />
		</div>

		<button
			class="base-dropdown__button"
			data-testID="ui-dropdown-button"
			:disabled="isDisabled"
			@click="toggleList"
		>
			<p
				v-text="selectedOption?.label || placeholder"
				:data-checked="!!selectedOption"
				class="base-dropdown__button-placeholder"
			/>
			<i class="base-dropdown__button-icon" />
		</button>

		<div
			v-show="!isDisabled && isActive"
			class="base-dropdown__list"
			data-testID="ui-dropdown-list"
		>
			<slot name="list" />
		</div>

		<div
			v-if="error"
			class="base-dropdown__footer"
		>
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

const props = withDefaults(defineProps<IBaseDropdownComponent>(), {
  	placeholder: 'Select your option',
});

const isActive = ref<boolean>(false);

watch(() => props.selectedOption, newValue => {
	(newValue) && closeList();
});

const toggleList = () => {
	isActive.value = !isActive.value;
};

const closeList = () => {
	(isActive.value) && toggleList();
};
</script>

<style lang="scss" src="./BaseDropdown.scss" />