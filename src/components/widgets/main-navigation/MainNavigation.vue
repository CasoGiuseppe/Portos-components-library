<template>
    <nav
        class="main-navigation"
        :data-collapsed="collapsedState"
    >
        <TransitionGroup
            appear
            tag="ul"
            class="main-navigation__list"
            @after-enter="endEnterEvent"
        >
            <li key="header">
                <h1 class="main-navigation__logo">
                    <figure class="main-navigation--has-image">
                        <slot name="logo" />
                    </figure>
                </h1>
            </li>
            <li
                v-for="(item, index) in navigationItems"
                :key="item.label"
            >
                <NavigationItem
                    :id="item.label"
                    full-size
                    rtl
                    :style="{ '--aniamtionDelay' : `${index * 0.02}s`}"
                >
                    <template #icon>
                        <Suspense>
                            <BaseIcon
                                :name="item.icon"
                                :type="item.type"
                                :size="iconSize"
                            />
                        </Suspense>
                    </template>

                    <template #label>
                        {{ item.label }}
                    </template>

                    <template #child v-if="item.children">
                        <ul>
                            <li
                                v-for="child in item.children"
                                :key="child.label"
                            >
                                <p style="padding: 10px 0; width: 220px;">
                                    {{ child.label }}
                                </p>
                            </li>
                        </ul>
                    </template>
                </NavigationItem>
            </li>
            <li key="minimize">
                <NavigationItem
                    id="minimize"
                    :key="iconMinimize"
                    full-size
                    rtl
                    @submit="handleCollapedState"
                >
                    <template #label>
                        Minimize
                    </template>

                    <template #icon>
                        <Suspense>
                            <BaseIcon
                                :id="iconMinimize"
                                :name="iconMinimize"
                                :type="Types.CHEVRON"
                                :size="iconSize"
                            />
                        </Suspense>
                    </template>
                </NavigationItem>
            </li>
        </TransitionGroup>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import NavigationItem from '@/components/navigation/main/navigation-item/NavigationItem.vue';
import BaseIcon from '@/components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from '@/components/base/base-icon/types';
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';
import { items as navigationItems } from './items/admin';


const collapsedState = ref<boolean>(false);
const iconMinimize = ref<string>('IconChevronLeftDuo');
const iconSize = ref<Sizes>(Sizes.M)

const { createObserver } = useIntersectionObserver({
    action: (e: any) => {
        e.target.dataset.position = e.isIntersecting ? 'top' : 'bottom';
    }
});

const handleCollapedState = () => {
    collapsedState.value = !collapsedState.value
    iconMinimize.value = collapsedState.value === true ? 'IconChevronRightDuo' : 'IconChevronLeftDuo';
    iconSize.value = collapsedState.value === true ? Sizes.S : Sizes.M;
}

const endEnterEvent = (e: any): void => {
    const child = e?.children?.[0];

    if (child) {
        const secondLevel = child.querySelector('.navigation-item__second-level');
    
        if (!secondLevel) return;
    
        const secondLevelOffset = secondLevel ? secondLevel.offsetHeight : 0;
        child.dataset.hidden = true;
        
        createObserver({
            element: child,
            options: {
                rootMargin: `0px 0px ${secondLevelOffset * -1}px 0px`,
                threshold: 1,
            }
        });
    }
};

</script>

<style src="./MainNavigation.scss" lang="scss"></style>