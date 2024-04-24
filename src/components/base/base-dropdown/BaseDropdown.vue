<template>
	<fieldset
		class="base-dropdown"
		data-testID="ui-dropdown"
		v-click-outside="closeList"
		tabindex="0"
		:disabled="disabled"
		:required="required"
	>
		<h2
			v-if="$slots['header']"
			class="base-dropdown__header"
		>
			<slot name="header" />
		</h2>

		<BaseButton
			data-testID="ui-dropdown-button"
			fullSize
			:type="Types.DROPDOWN"
			:active="isActive"
			@send="toggleList"
		>
			<template #default>{{ value }}</template>
			<template #error>
				<slot name="error" />
			</template>
		</BaseButton>

		<aside
			v-if="!disabled && isActive"
			class="base-dropdown__list"
		>
			<slot name="list" />
		</aside>
	</fieldset>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';

import { type UniqueId } from './types';
import BaseButton from '@/components/base/base-button/BaseButton.vue';
import { Types } from '@/components/base/base-button/types';

const props = defineProps({
    /**
     * Set the unique id of the dropdown component
     */
    id: {
        type: String as PropType<UniqueId>,
        default: 'ListId'
    },

    /**
     * Set the choosed label
     */
    value: {
        type: String as PropType<String>,
        default: 'Select your option'
    },

	/**
     * Set the choosed option
     */
	 current: {
        type: String as PropType<String>
    },

    /**
     * Set disabled status
     */
    disabled: {
        type: Boolean as PropType<boolean>,
    	default: false
    },

	/**
     * Set required status
     */
	 required: {
        type: Boolean as PropType<boolean>,
    	default: false
    },
});

const isActive = ref<boolean>(false);

watch(() => props.value, newValue => {
	(newValue) && closeList();
});

const toggleList = () => {
	if (!props.disabled) {
		isActive.value = !isActive.value;
	}
};

const closeList = () => {
	(isActive.value) && toggleList();
};
</script>

<style lang="scss" src="./BaseDropdown.scss" />