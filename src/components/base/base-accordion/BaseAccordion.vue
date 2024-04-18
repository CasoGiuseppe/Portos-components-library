<template>
    <section class="base-accordion">
        <details
            :id="id"
            :title="label"
            :aria-label="label"
            data-testID="ui-accordion"
            :open = open
        >
            <summary><slot name="title" /></summary>
            <article><slot name="content"/></article>
        </details>
        <slot name="nested"></slot>
    </section>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import { type UniqueId } from "./types"

defineProps({
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
    open: {
        type: Boolean as PropType<boolean>,
        default: false
    },
})
</script>

<style src="./BaseAccordion.scss" lang="scss"></style>
