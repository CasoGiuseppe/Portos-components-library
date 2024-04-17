<template>
	<div
		class="base-dropdown"
		data-testID="ui-dropdown"
		:data-active="isActive"
		:data-error="!!error"
		:data-disabled="isDisabled"
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

		<BaseButton
			data-testID="ui-dropdown-button"
			fullSize
			:disabled="isDisabled"
			:type="Types.DROPDOWN"
			:active="isActive"
			@send="toggleList"
		>
			<template #default>
				<slot
					name="placeholder"
					:placeholder="placeholder"
				/>
			</template>
		</BaseButton>

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
import BaseButton from '@/components/base/base-button/BaseButton.vue';
import { Types } from '@/components/base/base-button/types';

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
	if (!props.isDisabled) {
		isActive.value = !isActive.value;
	}
};

const closeList = () => {
	(isActive.value) && toggleList();
};
</script>

<style lang="scss" src="./BaseDropdown.scss" />