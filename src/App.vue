<template>
        <template
            v-for="item in navigation"
            :key="item.label"
        >
            <SideNavigationItem
                :inverse="item.inverse"
                :children="item.children"
                :expanded="item.expanded"
            >
                <template #icon>
                    <BaseIcon
                        :name="item.icon"
                        :size="item.expanded ? Sizes.M : Sizes.L"
                    />
                </template>
                <template #label>
                    {{ item.label }}
                </template>
            </SideNavigationItem>
        </template>
    <!-- </div> -->
</template>
<script setup lang="ts">
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import SideNavigationItem from '@/components/side-navigation/side-navigation-item/SideNavigationItem.vue';
import { type ISideNavigationItem } from './components/side-navigation/side-navigation-item/types';
import { Sizes } from './components/base/base-icon/types';

const navigation: ISideNavigationItem[] = [
    {
        label: 'Label 1',
        icon: 'IconArrowCircleRight',
        link: 'https://google.com',
        inverse: false,
        expanded: true
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        link: 'https://youtube.com',
        inverse: true,
        expanded: true,
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                link: 'https://youtube.com',
                inverse: false,
                expanded: true
            }
        ]
    },
    {
        label: 'Label 3',
        icon: 'IconArrowCircleRight',
        link: 'https://google.com',
        inverse: false,
        expanded: false
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        link: 'https://youtube.com',
        inverse: true,
        expanded: false,
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                link: 'https://youtube.com',
                inverse: false,
                expanded: false
            }
        ]
    },
]
</script>
