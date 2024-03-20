<template>
    <component
        :is="IconAsyncDefine"
        :id="id"
        :key="id"
        :class="[
            'base-icon',
            `base-icon--is-${size}`,
        ]"
    />
</template>
<script lang="ts" setup>
import { Types, Sizes, type Names } from './types';
import useAsyncComponent from '@/shared/composables/useAsyncComponent';

interface IIconComponent {
    id: string;
    name: Names,
    type: Types,
    size?: Sizes
}

const { create } = useAsyncComponent();
const { name, type } = withDefaults(defineProps<IIconComponent>(), {
    id: 'IconArrowCircleUp',
    /**
     * Set Icon component name
     */
    name: 'IconArrowCircleUp',
    /**
     * Set Icon component type
     */
    type: Types.ARROW,
    size: Sizes.M
});
const IconAsyncDefine = await create({ component: `components/icons/${type}/${name}`})
</script>
<style src="./BaseIcon.scss" lang="scss"></style>