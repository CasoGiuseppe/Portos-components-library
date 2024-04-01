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
                        <ul ref="children">
                            <li
                                v-for="child in item.children"
                                :key="child.label"
                            >
                                <p
                                    v-text="child.label"
                                    style="padding: 10px 0; width: 220px;"
                                />
                            </li>
                        </ul>
                    </template>
                </NavigationItem>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from '@/components/base/base-icon/types';
import type { INavigationItem } from './types';
import {
    loadNavigationItems,
    switchChildrenPosition
} from './helpers';
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';

const navigationItems = ref<INavigationItem[]>([]);
const collapsed = ref<boolean>(false);
const children = ref<HTMLCollection | null>(null);
const observed = ref<boolean>(false);

const { createObserver } = useIntersectionObserver({
    action: switchChildrenPosition,
});

watch(children, (currentValue) => {
    if (currentValue && !observed.value) {
        observed.value = !!createObserver({
            collection: currentValue
        });
    }
});

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