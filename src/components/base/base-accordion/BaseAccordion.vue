<template>
    <div class="base-accordion">
        <div class="base-accordion__card">
            <label
                :for="`accordion-item-${id}`"
                class="base-accordion__title"
                :title="label"
                :aria-label="label"
                tabindex="0"
                @keydown.space.prevent="setChangeByKey"
                @keydown.enter.prevent="setChangeByKey"
                @change="handleChange"
            >
                <input
                    data-testID="ui-accordion"
                    class="base-accordion__checkbox"
                    type="checkbox"
                    :checked="active"
                    :id="`accordion-item-${id}`"
                    v-model="accordionStatus"
                />
                <slot name="title">Item 1</slot>
                <span class="base-accordion__icon">
                    <BaseIcon
                        v-if="accordionStatus"
                        name="IconChevronUpM"
                        :type="Types.CHEVRON"
                        :size="Sizes.M"
                    />
                    <BaseIcon
                        v-else
                        name="IconChevronDownM"
                        :type="Types.CHEVRON"
                        :size="Sizes.M"
                    />
                </span>
            </label>
            <div class="base-accordion__content" v-show="accordionStatus">
                <slot name="content">Contenido Item 1</slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue"
import BaseIcon from "../base-icon/BaseIcon.vue"
import { Types, Sizes } from "../base-icon/types"
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
     * Set checked state
     */
    active: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

const accordionStatus = ref<boolean>(active)

const emit = defineEmits(["updateStatus"])

const handleChange = () => {
    emit("updateStatus", { id, status: accordionStatus.value })
}

const setChangeByKey = () => {
    accordionStatus.value = !accordionStatus.value
    handleChange()
}
</script>

<style src="./BaseAccordion.scss" lang="scss"></style>
