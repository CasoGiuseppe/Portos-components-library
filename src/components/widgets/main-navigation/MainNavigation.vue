<template>
    <NavigationItem
        v-for="item in navigationItems"
        :key="item.label"
    >
        <template #icon>
            <Suspense>
                <BaseIcon
                    :name="item.icon"
                    :type="item.type"
                    :size="collapsed ? Sizes.M : Sizes.S"
                />
            </Suspense>
        </template>
        <template #label>
            <p v-text="item.label" />
        </template>
    </NavigationItem>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';

import { Types, Sizes } from '@/components/base/base-icon/types';

const collapsed = ref<Boolean>(false);

const navigationItems = [
    {
        label: 'Mi Panel',
        type: Types.LOCATION,
        icon: 'IconLocationHouse'
    },
    {
        label: 'Unidades',
        type: Types.LOCATION,
        icon: 'IconLocationUnit'
    },
    {
        label: 'Granel',
        type: Types.MISCELLANEA,
        icon: 'IconMiscellaneaLeaf'
    },
    {
        label: 'Operaciones',
        type: Types.LOCATION,
        icon: 'IconLocationBuilding'
    },
    {
        label: 'Puerta',
        type: Types.ARROW,
        icon: 'IconArrowLeftRight'
    },
    {
        label: 'Custom',
        type: Types.PLACEHOLDER,
        icon: 'IconPlaceholder'
    },
    {
        label: 'Maestros',
        type: Types.USER,
        icon: 'IconUserUserCardId'
    },
    {
        label: 'Facturación',
        type: Types.FILE,
        icon: 'IconFileBilling'
    },
    {
        label: 'Configuración',
        type: Types.SYSTEM,
        icon: 'IconSystemConfiguration'
    }
]
</script>

<style src="./MainNavigation.scss" lang="scss"></style>