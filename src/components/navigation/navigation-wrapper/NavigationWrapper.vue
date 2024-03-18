<template>
    <nav
        :class="[
            'navigation-wrapper',
            collapsed ? 'navigation-wrapper--is-collapsed' : ''
        ]"
    >
        <picture class="navigation-wrapper__header">
            <img
                src="@/assets/logo.svg"
                class="navigation-wrapper__logo"
            />
        </picture>
        <ul
            v-for="(item, index) in navigation"
            :key="item.label"
        >
            <NavigationItem
                :id="index"
                :label="item.label"
                :inversed="inversed"
                :children="item.children"
                :collapsed="collapsed"
                :selected="index === selectedItem"
                @select="updateSelected"
            >
                <template #icon>
                    <BaseIcon
                        :name="item.icon"
                        :size="collapsed ? Sizes.L : Sizes.M"
                        :type="item.type"
                    />
                </template>
            </NavigationItem>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import { Sizes, Types } from '@/components/base/base-icon/types';
import { type INavigationItem } from '@/components/navigation/navigation-item/types';
import { type INavigationWrapperComponent } from '@/components/navigation/navigation-wrapper/types';

const selectedItem = ref<number>();
// const collapsed = ref<boolean>(false);

const updateSelected = (id: number) => {
    selectedItem.value = id;
};

withDefaults(defineProps<INavigationWrapperComponent>(), {
    inversed: false,
    collapsed: false
});

const navigation: INavigationItem[] = [
    {
        label: 'Label 1',
        icon: 'IconArrowCircleRight',
        type: Types.ARROW,
        link: 'https://google.com',
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        type: Types.ARROW,
        link: 'https://youtube.com',
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                type: Types.ARROW,
                link: 'https://youtube.com',
            }
        ]
    },
    {
        label: 'Label 3',
        icon: 'IconArrowCircleRight',
        type: Types.ARROW,
        link: 'https://google.com',
    },
    {
        label: 'Label 2',
        icon: 'IconArrowCircleRight',
        type: Types.ARROW,
        link: 'https://youtube.com',
        children: [
            {
                label: 'Children 1',
                icon: 'IconArrowCircleRight',
                type: Types.ARROW,
                link: 'https://youtube.com',
            }
        ]
    },
]
</script>

<style src="./NavigationWrapper.scss" lang="scss"></style>