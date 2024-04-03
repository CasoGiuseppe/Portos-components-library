<template>
    <section class="slider">
        <button @click="moveTo({ type: 'prev'})" class="slider--is-prev">prev</button>
            <section class="slider__wrapper">
                <ul class="slider__list" ref="list">
                    <li class="slider__item small">1</li>
                    <li class="slider__item small">2</li>
                    <li class="slider__item big">3</li>
                    <li class="slider__item small">4</li>
                    <li class="slider__item medium">5</li>
                    <li class="slider__item small">6</li>
                    <li class="slider__item medium">7</li>
                </ul>
            </section>
        <button @click="moveTo({})" class="slider--is-next">next</button>
    </section>
</template>
<script setup lang="ts">
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver';
import { onMounted, ref } from 'vue';

const list = ref<HTMLElement | null>(null)
const currentHTMLNode = ref<HTMLElement | null>(null);

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

    const childs = [listCollection.firstChild, listCollection.lastChild];

    currentHTMLNode.value = listCollection.firstChild as HTMLElement

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