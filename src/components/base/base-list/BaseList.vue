<template>
    <ul
        class="base-list" ref="listParent"
        :data-mode="mode"
    >
        <li
            class="base-list__option"
            v-for="(item, index) in list"
            :key="item.id"
            tabindex="0"
            :data-index="index"
            :data-option="item.option"
            :data-current="currentNode === item.option ? true : false"
            @keyup.down="keyMove"
            @keyup.up="keyMove"
            @keyup.enter="select"
            @focus="focus"
            @click="select"
            >
            <span
                v-if="icon"
                class="base-list__icon"
            >
                <slot :property="{ icon: item.icon }" name="icon" />
            </span>
            <p class="base-list__label">
                <slot :property="{ label: item.label }" name="row" />
            </p>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, useSlots, type Component, type PropType } from 'vue';
import { Mode } from './types';
import { validateValueCollectionExists } from '@ui/utilities/validation/useValidation';

export type IIcon = {
    type: Component,
    props: Record<string, any>;
}
export type IList = {
    id: string,
    label: string,
    option: string,
    icon?: IIcon
}

const { current } = defineProps({
    /**
   * Set the list of component elements
   */
  list: {
    type: Array as PropType<Array<IList>>,
    default: () => []
  },

   /**
   * Set the current selected item
   */
   current: {
    type: String as PropType<String>,
  },

  /**
   * Set the current selected item
   */
   mode: {
    type: String as PropType<Mode>,
    default: Mode.DEFAULT,
    validator: (prop: Mode) => validateValueCollectionExists({ collection: Mode, value: prop})
  },
})

const slots = useSlots();
const icon = computed(() => !!slots['icon']);

const tabIndex = ref<number>(0)
const listParent = ref<HTMLElement | null>(null);
const currentNode = ref<String | undefined>(current);

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

const select = (payload: Event | Element): void => {
    const { dataset: { option }, innerText } = payload instanceof Event ? payload.target as HTMLInputElement : payload as HTMLInputElement;
    currentNode.value = option;
    customEmits('send', { option, label: innerText })
};

onMounted(() => {
    if(!current) return;
    if(!listParent.value) return;

    const startNode = listParent.value.querySelector(`[data-option="${current}"]`);
    if(!startNode) return;

    select(startNode)
})
</script>
<style src="./BaseList.scss" lang="scss"></style>