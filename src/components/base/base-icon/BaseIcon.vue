<template>
    <IconAsyncDefine></IconAsyncDefine>
</template>
<script lang="ts" setup>
    import { type Component, defineAsyncComponent } from 'vue';
    import { IconType, type IconName } from './type';

    interface IIconComponent {
        name: IconName,
        type: IconType
    }

    const { name, type } = withDefaults(defineProps<IIconComponent>(), {
        /**
         * Set Icon component name
         */
        name: 'IconArrowCircleUp',
        /**
         * Set Icon component type
         */
        type: IconType.ARROW
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