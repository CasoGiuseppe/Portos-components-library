<template>
	<section
		v-click-outside="closeList"
		class="base-dropdown"
		tabindex="0"
	>
		<h2
			v-if="!!slots['header']"
			:data-disabled="disabled"
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
				<p :data-checked="!!current">{{ text }}</p>
			</template>
			<template #error>
				<slot name="error" />
			</template>
		</BaseButton>

		<aside
			v-if="!disabled && isActive"
			class="base-dropdown__list"
			data-testID="ui-dropdown-list"
		>
            <BaseList
                :mode="Mode.DROPDOWN"
                :list="list"
				:current="current"
				:visible-options="5"
                @send="changeCurrentValue"
            >
                <template #row="{ label }">{{ label }}</template>
                <template #component="{ component }">
                    <Component
                        v-if="component"
                        :is="component.type"
                        v-bind="component.props"
                    />
                </template>
            </BaseList>
		</aside>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, watch, type PropType } from 'vue';

import BaseButton from '@/components/base/base-button/BaseButton.vue';
import BaseList from '@/components/base/base-list/BaseList.vue';
import { type UniqueId } from './types';
import { Types } from '@/components/base/base-button/types';
import { Mode, type IList, type ISelected } from '@/components/base/base-list/types';

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
    placeholder: {
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
        type: Boolean as PropType<Boolean>,
        default: false,
    },
    /**
     * Set the list of component elements
     */
	 list: {
        type: Array as PropType<Array<IList>>,
        default: () => []
    },
});

const slots = useSlots();
const isActive = ref<boolean>(false);
const text = ref<string>(props.placeholder as string);

const customEmits = defineEmits(['send']);

const changeCurrentValue = ({ label, option }: ISelected): void => {
	text.value = label;
	customEmits('send', option);
};

watch((): String | undefined => props.current, newValue => {
	(newValue) && closeList();
});

const toggleList = (): void => {
	if (!props.disabled) {
		isActive.value = !isActive.value;
	}
};

const closeList = (): void => {
	(isActive.value) && toggleList();
};

onMounted(() => {
	const { current, list } = props;

	if (current) {
		const currentOption = list
			.find(({ option }) => option === current);
		
		text.value = currentOption?.label as string
	}
});
</script>

<style lang="scss" src="./BaseDropdown.scss" />