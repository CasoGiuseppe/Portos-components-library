<template>
    <section class="slider-tool">
        <button
            @click="moveTo({ type: 'prev' })"
            class="slider-tool--is-prev"
            data-testID="ui-slider-prev"
            :disabled="isDisabled"
        >
            <BaseIcon
                id="sliderPrev"
                :type="Types.CHEVRON"
                name="IconChevronLeftM"
                :size="Sizes.S"
            />
        </button>
        <section class="slider-tool__wrapper">
            <ul class="slider-tool__list" ref="list">
                <li
                    v-for="{ id, label, component } in body"
                    :key="id"
                    class="slider-tool__item"
                    data-testID="ui-slider-item"
                >
                    <!-- @Slot for item with :property-->
                    <slot :property="{ label, id, component }" name="item"></slot>
                </li>
            </ul>
        </section>
        <button
            @click="moveTo({})"
            class="slider-tool--is-next"
            data-testID="ui-slider-next"
            :disabled="isDisabled"
        >
            <BaseIcon
                id="sliderNext"
                :type="Types.CHEVRON"
                name="IconChevronRightM"
                :size="Sizes.S"
            />
        </button>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'
import useIntersectionObserver from '@/shared/composables/useIntersectionObserver'
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue'
import { Types, Sizes } from '@ui/base/base-icon/types'
import type { ISliderItems } from './types';
import { AwaitScrollIntoView } from '@/shared/helpers';

const list = ref<HTMLElement | null>(null)
const currentHTMLNode = ref<HTMLElement | null>(null)
const isDisabled = ref<boolean>(false)


const { body } = defineProps({
    /**
     * Set the list of component elements
     */
     body: {
        type: Array as PropType<Array<ISliderItems>>,
        default: () => []
    },
})

const { createObserver } = useIntersectionObserver({
    action: (e: any) => {
        const { isIntersecting } = e
        e.target.dataset.visible = isIntersecting
    }
})

const moveTo = async ({ type = 'next' }: { type?: string }): Promise<void> => {
    if (!list.value) return
    if (!currentHTMLNode.value) return
    isDisabled.value = true
    const currentNode = getNextPrevSibling({ element: currentHTMLNode.value, type });
    if(!currentNode) return;

    await AwaitScrollIntoView(
        currentNode,
        { block: 'nearest', inline: 'start' }
    ).then(() => isDisabled.value = false)
}

const getNextPrevSibling = ({
    element,
    type = 'next'
}: {
    element: HTMLElement
    type?: string
}): HTMLElement => {
    const target = type === 'next' ? element.nextElementSibling : element.previousElementSibling
    const HTMLTarget = target as HTMLElement
    currentHTMLNode.value = HTMLTarget
    return HTMLTarget
}

onMounted(() => {
    const listCollection = list.value
    if (!listCollection) return

    const collectionChildSize = Array.from(listCollection.childNodes).filter(
        (node) => node.nodeName !== '#text'
    )
    if (collectionChildSize.length === 1) return
    const childs = [collectionChildSize.at(0), collectionChildSize.at(-1)]

    currentHTMLNode.value = collectionChildSize.at(0) as HTMLElement

    childs.forEach((element) => {
        createObserver({
            element: element as HTMLElement,
            options: {
                threshold: 1
            }
        })
    })

    list.value!.style.setProperty('--slider-position', `0px`)
})
</script>

<style src="./SliderTool.scss" lang="scss"></style>
