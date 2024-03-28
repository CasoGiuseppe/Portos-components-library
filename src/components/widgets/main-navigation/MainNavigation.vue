<template>
    <nav class="main-navigation">
        <slot name="logo" />
        <ul>
            <li
                :class="[
                    'main-navigation--list-item',
                    item.customClass ? item.customClass : ''
                ]"
                v-for="item in navigationItems"
                :key="item.label"
            >
                <NavigationItem
                    :collapsed="collapsed"
                    @click="item.action"
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
                    <template #children v-if="item.children">
                        <template
                            v-for="child in item.children"
                            :key="child.label"
                        >
                            <p
                                v-text="child.label"
                                style="padding: 10px 0; width: 220px;"
                            />
                        </template>
                    </template>
                </NavigationItem>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from '@/components/base/base-icon/types';
import type { INavigationItem } from './types';

const navigationItems = ref<INavigationItem[]>([]);
const collapsed = ref<boolean>(false);

const loadNavigationItems = async (userRole: string) => {
    try {
        const { default: items } = await import(`./items/${userRole}`);
        return items;
    } catch (error) {
        console.error('Error loading items file:', error);
    }
};

onMounted(async () => {
    const userRole = 'admin';
    const items = await loadNavigationItems(userRole);

    navigationItems.value = [
        ...items,
        {
            label: 'Minimize',
            type: Types.CHEVRON,
            icon: 'IconChevronLeftDuo',
            customClass: "main-navigation--list-item-minimize",
            action: () => (collapsed.value = !collapsed.value)
        }
    ];
});
</script>

<style src="./MainNavigation.scss" lang="scss"></style>