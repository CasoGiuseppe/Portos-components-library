<template>
    <component
        :is="IconAsyncDefine"
        :class="[
            'base-icon',
            `base-icon--is-${size}`,
        ]"
    />
</template>
<script lang="ts" setup>
    import { type Component, defineAsyncComponent } from 'vue';
    import { Types, Sizes, type Names } from './types';

    export interface IIconComponent {
        name: Names,
        type: Types,
        size?: Sizes
    }

    const { name, type } = withDefaults(defineProps<IIconComponent>(), {
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

    const IconAsyncDefine = defineAsyncComponent({
        loader: async () => {
            try {
                let icon: Component | undefined;
                icon = (await import(`../../icons/${type}/${name}.vue`)) as Component;

                if (icon === undefined) throw new Error();

                return icon;
            } catch (error) {
                throw new Error('Failed to load component.')
            }
        }
    });

</script>
<style src="./BaseIcon.scss" lang="scss"></style>./types