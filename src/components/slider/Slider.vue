<template>
    <section class="slider">
        <button
            @click="moveTo({ type: 'prev'})"
            class="slider--is-prev"
            :disabled="isDisabled"
        >prev</button>
            <section class="slider__wrapper">
                <ul class="slider__list" ref="list">
                    <li
                        v-for="{id, label, className } in body"
                        :key="id"
                        :class="`slider__item ${className}`"
                    >
                        <slot :property="{ label, id }" name="item"></slot>
                    </li>
                </ul>
            </section>
        <button
            @click="moveTo({})"
            class="slider--is-next"
            :disabled="isDisabled"
        >next</button>
    </section>
</template>
<script setup lang="ts">
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';
import { onMounted, ref } from 'vue';

const list = ref<HTMLElement | null>(null)
const currentHTMLNode = ref<HTMLElement | null>(null);
const isDisabled = ref<boolean>(false);

export interface ISLiderItems {
    body: Record<string, any>[];
}

withDefaults(defineProps<ISLiderItems>(), {
    /**
     * Set table body content
     */
    body: () => [],
});

const { createObserver } = useIntersectionObserver({
    action: (e: any) => {
        const { isIntersecting } = e;
        e.target.dataset.visible = isIntersecting
    }
});

const getNextTargetPosition = ({ current } : { current: HTMLElement }): number => {
    currentHTMLNode.value = current;
    return current.offsetLeft
}

const moveTo = ({ type = 'next' }: { type?: string }): void => {
    if(!list.value) return;
    if(!currentHTMLNode.value) return;
    isDisabled.value = true
    setNewPositionVariable({
        position: getNextTargetPosition({
            current: getNextPrevSibling({element: currentHTMLNode.value, type })
        })
    })
}

const setNewPositionVariable = ({ position }: { position: number }): void => {
    if(!list.value) return;
    list.value.style.setProperty(
        '--slider-position',
        `${position?.toString()}px` || '0'
    )

    list.value.addEventListener('transitionend', () => isDisabled.value = false)
}

const getNextPrevSibling = ({ element, type = 'next' }: {element: HTMLElement, type?: string}): HTMLElement => {
    const target = type === 'next' ? element.nextElementSibling : element.previousElementSibling;
    const HTMLTarget = target as HTMLElement
    currentHTMLNode.value = HTMLTarget;
    return HTMLTarget
}

onMounted(() => {
    const listCollection = list.value;
    if(!listCollection) return;

    const collectionChildSize = Array.from(listCollection.childNodes).filter(node => node.nodeName !== '#text')
    if(collectionChildSize.length === 1) return
    const childs = [collectionChildSize.at(0), collectionChildSize.at(-1)];

    currentHTMLNode.value = collectionChildSize.at(0) as HTMLElement

    // console.log(childs, listCollection)
    childs.forEach(element => {
        createObserver({
            element: element as HTMLElement,
            options: {
                threshold: 1
            }
        });
    })
})
</script>
<style src="./Slider.scss" lang="scss"></style>