<template>
	<div
		class="base-dropdown"
		data-testID="ui-dropdown"
		:data-active="isActive"
		:data-error="!!error"
		:data-disabled="disabled"
		v-click-outside="closeList"
		@focus="toggleList"
		tabindex="0"
	>
		<h2
			v-if="!!slots['header']"
			class="base-dropdown__header"
		>
			<slot name="header" />
		</h2>

		<BaseButton
			data-testID="ui-dropdown-button"
			fullSize
			:disabled="!!disabled"
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
			v-if="!disabled && isActive"
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
import { ref, useSlots, watch, type PropType } from 'vue';

import { type UniqueId } from './types';
import BaseButton from '@/components/base/base-button/BaseButton.vue';
import { Types } from '@/components/base/base-button/types';
import { type ISelected } from '@/components/base/base-list/types';

const props = defineProps({
    /**
     * Set the unique id of the dropdown component
     */
    id: {
        type: String as PropType<UniqueId>,
        default: 'ListId'
    },

    /**
     * Set the placeholder/text message
     */
    placeholder: {
        type: String as PropType<String>,
        default: 'Select your option'
    },

    /**
     * Set the current selected item
     */
	 selectedOption: {
        type: Object as PropType<ISelected>,
    },

    /**
     * Set disabled status
     */
    disabled: {
        type: Boolean as PropType<Boolean>,
        default: false,
    },

    /**
     * Set error message
     */
    error: {
        type: String as PropType<String>,
    }
});

const slots = useSlots();
const isActive = ref<boolean>(false);

watch(() => props.selectedOption, newValue => {
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