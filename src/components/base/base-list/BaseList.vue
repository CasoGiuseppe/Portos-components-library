<template>
    <ul class="base-list" ref="listParent">
        <li
            class="base-list__item"
            v-for="(item, index) in list"
            :key="item.id"
            tabindex="0"
            :data-index="index"
            :data-option="item.option"
            @keyup.down="keyMove"
            @keyup.up="keyMove"
            @keyup.enter="select"
            @focus="focus"
            @click="select"
        >
            <p class="base-list__label">
                <slot :property="{ label: item.label }" name="row"></slot>
            </p>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, type PropType } from 'vue';

export type ITableList = {
    id: string,
    label: string,
    option: string,
}

const { current } = defineProps({
    /**
   * Set the list of component elements
   */
  list: {
    type: Array as PropType<Array<ITableList>>,
    default: () => []
  },

   /**
   * Set the current selected item
   */
   current: {
    type: String as PropType<String>,
  },
})

const tabIndex = ref<number>(0)
const listParent = ref<HTMLElement | null>(null);
const listSize = computed(() => {
    if(!listParent.value) return 0;
    const childs = [...listParent.value.childNodes].filter((node) => node.nodeName !== '#text')
    return childs.length - 1
})

const customEmits = defineEmits(['send']);
const keyMove = ({ code }: { code: string }) => keyHandler[code as keyof typeof keyHandler]()

const keyHandler = {
    ArrowDown: (): void => {
        const currentIndex = tabIndex.value = tabIndex.value === listSize.value ? 0 : tabIndex.value + 1
        const currentDOMNode = getDOMElementByData({ index: currentIndex }) as HTMLElement
        if(!currentDOMNode) return
        currentDOMNode.focus()
    },

    ArrowUp: (): void => {
        const currentIndex = tabIndex.value = tabIndex.value === 0 ? listSize.value : tabIndex.value - 1
        const currentDOMNode = getDOMElementByData({ index: currentIndex }) as HTMLElement
        if(!currentDOMNode) return
        currentDOMNode.focus()
    }
}

const getDOMElementByData = ({ index } : { index: number }): Element | undefined => {
    if(!listParent.value) return;
    return listParent.value.querySelector(`[data-index="${index}"]`) || undefined
}

const focus = (payload: Event): void => {
    const { dataset: { index } } = payload.target as HTMLInputElement
    if(!index) return
    tabIndex.value = parseInt(index, 10);
}

const select = (payload: Event): void => {
    const { dataset: { option }, innerText } = payload.target as HTMLInputElement
    customEmits('send', { option, label: innerText })
};

onMounted(() => {
    if(!current) return;
    if(!listParent.value) return;

    const getCurrentFromDOMElements = listParent.value.querySelector(`[data-option="${current}"]`) as HTMLElement
    if(!getCurrentFromDOMElements) return;

    getCurrentFromDOMElements.dataset.current = 'true'
    console.log(getCurrentFromDOMElements)
})
</script>
<style src="./BaseList.scss" lang="scss"></style>