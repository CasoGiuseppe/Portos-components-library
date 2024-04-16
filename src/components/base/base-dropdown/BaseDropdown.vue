<template>
	<div
		class="base-dropdown"
		data-testID="ui-dropdown"
		:data-active="isActive"
		:data-error="!!error"
		v-click-outside="closeList"
		@focus="toggleList"
		tabindex="0"
	>
		<h2
			v-if="hasHeaderSlot"
			class="base-dropdown__header"
		>
			<slot name="header" />
		</h2>

		<button
			class="base-dropdown__button"
			data-testID="ui-dropdown-button"
			:disabled="isDisabled"
			@click="toggleList"
		>
			<slot
				name="placeholder"
				:placeholder="placeholder"
			/>
		</button>

		<aside
			v-if="!isDisabled && isActive"
			class="base-dropdown__list"
			data-testID="ui-dropdown-list"
		>
			<slot name="list" />
		</aside>

		<p
			v-if="error"
			class="base-dropdown__footer"
		>
			<slot
				name="footer"
				:error="error"
			/>
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from 'vue';

import { type IBaseDropdownComponent } from './types';

const props = withDefaults(defineProps<IBaseDropdownComponent>(), {
	placeholder: 'Select your option',
});

const { header } = useSlots();
const isActive = ref<boolean>(false);

const hasHeaderSlot = !!header;

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