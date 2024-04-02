<template>
    <nav class="main-navigation">
        <slot name="logo" />
        <TransitionGroup
            appear
            tag="ul"
            @after-enter="endEnterEvent"
        >
            <li
                :class="[
                    'main-navigation--list-item',
                    item.customClass ? item.customClass : ''
                ]"
                v-for="item in navigationItems"
                :key="item.label"
            >
                <NavigationItem
                    :id="item.label"
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
                        <ul>
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
        </TransitionGroup>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import NavigationItem from '@/components/navigation/navigation-item/NavigationItem.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from '@/components/base/base-icon/types';
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';
import type { INavigationItem } from './types';
import { loadNavigationItems } from './helpers';

const navigationItems = ref<INavigationItem[]>([]);
const collapsed = ref<boolean>(false);

const { createObserver } = useIntersectionObserver({
    action: (e: any) => {
        e.target.dataset.position = e.isIntersecting ? 'top' : 'bottom';
    }
});

const endEnterEvent = (e: any): void => {
    const child = e.children[0];
    const secondLevel = child.querySelector('.navigation-item__second-level');

    if (!secondLevel) return;

    const secondLevelOffset = secondLevel ? secondLevel.offsetHeight : 0;
    if (secondLevel) secondLevel.classList.add('navigation-item__second-level--is-hidden');
    
    createObserver({
        element: child,
        options: {
            rootMargin: `0px 0px ${secondLevelOffset * -1}px 0px`,
            threshold: 1,
        }
    });
}

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
    ]
});
</script>

<style src="./MainNavigation.scss" lang="scss"></style>