<template>
    <section>
        <BaseRadio
            id="my-radio-group"
            name="myRadioGroup"
            :options="radioOptions"
            v-model="selectedOption"
            @update:modelValue="onSelectionChanged"
        >
        </BaseRadio>
    </section>
</template>

<script setup lang="ts">
import BaseRadio from "@/components/base/base-radio/BaseRadio.vue"
import { ref } from "vue"
const radioOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3", disabled: true },
    { label: "Option 4", value: "option4" }
]

const selectedOption = ref("")

const onSelectionChanged = (newValue: any) => {
    console.log("Selected option:", newValue)
}
</script>
