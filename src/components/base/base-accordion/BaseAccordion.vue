<template>
    <div :class="['base-accordion', { 'base-accordion--nested': nested }]">
        <details
            :open="accordionStatus"
            :title="label"
            :aria-label="label"
            data-testID="ui-accordion"
            :id="`accordion-item-${id}`"
            @toggle="handleChange"
        >
            <summary class="base-accordion__title">
                <div class="base-accordion__title-sumary">
                    <slot name="title"> Item 1 </slot>
                </div>
                <span class="base-accordion__icon-chevron"></span>
            </summary>
            <article class="base-accordion__description">
                <slot name="description">
                    Epcot is a theme park at Walt Disney World Resort featuring
                    exciting attractions, international pavilions, award-winning
                    fireworks and seasonal special events.</slot
                >
            </article>
        </details>
        <slot name="nested-accordion"></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue"
import { type UniqueId } from "./types"

const { active, id } = defineProps({
    /**
     * Set the unique id of the ui accordion
     */
    id: {
        type: String as PropType<UniqueId>,
        default: "AccordionID"
    },
    /**
     * Set the aria accesibility label
     */
    label: {
        type: String as PropType<string>,
        default: "component label"
    },
    /**
     * Set accordion state
     */
    active: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    /**
     * Set nested accordion
     */
    nested: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const accordionStatus = ref<boolean>(active)

const emit = defineEmits(["updateStatus"])

const handleChange = () => {
    accordionStatus.value = !accordionStatus.value
    emit("updateStatus", { id, status: accordionStatus.value })
}
</script>

<style src="./BaseAccordion.scss" lang="scss"></style>
