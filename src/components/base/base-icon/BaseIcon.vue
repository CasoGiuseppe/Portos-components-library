<template>
    <component
        data-testID="ui-icon"
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
import { Types, Sizes, type UniqueId } from './types';
import useAsyncComponent from '@/shared/composables/useAsyncComponent';
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation';

const { create } = useAsyncComponent();
const { name, type } = defineProps({
    /**
    * Set the unique id of the ui button
    */
    id: {
        type: String as PropType<UniqueId>,
        default: 'iconId'
    },

    /**
    * Set icon name to get svg file
    */
    name: {
        type: String as PropType<string>,
        default: 'IconNavigationCloseS'
    },

    /**
    * Set the icon type family
    */
    type: {
        type: String as PropType<Types>,
        default: Types.NAVIGATION,
        validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop})
    },

    /**
    * Set the icon size [L, M, S, XS]
    */
    size: {
        type: String as PropType<Sizes>,
        default:Sizes.M,
        validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop})
    },
})
const IconAsyncDefine = await create({ component: `components/icons/${type}/${name}`})
</script>
<style src="./BaseIcon.scss" lang="scss"></style>