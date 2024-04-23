<template>
    <section style="padding: 1rem; background: #00204e">
        <BaseRadio
            id="my-radio-group"
            name="myRadioGroup"
            :options="radioOptions"
            :direction="UIRadioDirection.COLUMN"
            v-model="selectedOption"
            @update:modelValue="onSelectionChanged"
            :size="Sizes.M"
            :variant="true"
        >
        </BaseRadio>
    </section>
    <section>
        <BaseRadio
            id="my-radio-group-2"
            name="myRadioGroup2"
            :options="radioOptions"
            :direction="UIRadioDirection.ROW"
            v-model="selectedOption"
            @update:modelValue="onSelectionChanged"
            :size="Sizes.S"
            :variant="false"
        >
        </BaseRadio>
    </section>
</template>

<script setup lang="ts">
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"
import { ref } from "vue"
import {
    type UIRadioOptions,
    UIRadioDirection,
    Sizes
} from "./components/base/base-radio/types"
const radioOptions: UIRadioOptions[] = [
    { label: "Option 1", value: "option1", disabled: true },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" }
]

const selectedOption = ref("option1")

const onSelectionChanged = (newValue: any) => {
    console.log("Selected option:", newValue)
}
</script>
