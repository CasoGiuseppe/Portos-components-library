<template>
    <section
        :style="{
            display: 'flex',
            gap: '10px',
            padding: '10px',
            'background-color': 'white'
        }"
    >
        <BaseToggle :label="'asdasd'" @checked="checked"> default </BaseToggle>
    </section>
    <section
        :style="{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            'background-color': 'lightgrey'
        }"
    >
        <BaseCheckbox
            :id="'id001'"
            @checked="checked"
            :active="false"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="false"
            :disabled="true"
        >
            NORMAL
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id002'"
            @checked="checked"
            :active="true"
            :status="Types.ERROR"
            :size="Sizes.S"
            :variant="false"
            :disabled="true"
        >
            NORMAL
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id003'"
            @checked="checked"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="true"
            :disabled="true"
        >
            ALT
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id004'"
            :active="true"
            @checked="checked"
            :status="Types.ERROR"
            :size="Sizes.S"
            :variant="true"
            :disabled="true"
        >
            ALT
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id005'"
            @checked="checked"
            :active="true"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="false"
            :disabled="true"
        >
            NORMAL
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id006'"
            @checked="checked"
            :active="true"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="true"
            :disabled="true"
        >
            ALT
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id007'"
            @checked="checked"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :indeterminate="true"
            :variant="false"
            :disabled="true"
        >
            indeterminate
        </BaseCheckbox>
    </section>

    <section
        :style="{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            'background-color': 'lightgrey'
        }"
    >
        <BaseCheckbox
            :id="'id001'"
            @checked="checked"
            :active="false"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="false"
            :disabled="false"
        >
            NORMAL DEFAULT
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id002'"
            @checked="checked"
            :active="true"
            :status="Types.ERROR"
            :size="Sizes.S"
            :variant="false"
            :disabled="false"
        >
            NORMAL ERROR
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id003'"
            @checked="checked"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :variant="true"
            :disabled="false"
        >
            ALT DEFAULT
        </BaseCheckbox>
        <BaseCheckbox
            :id="'id004'"
            :active="true"
            @checked="checked"
            :status="Types.ERROR"
            :size="Sizes.S"
            :variant="true"
            :disabled="false"
        >
            ALT ERROR
        </BaseCheckbox>

        <BaseCheckbox
            :id="'id007'"
            @checked="checked"
            :status="Types.DEFAULT"
            :size="Sizes.S"
            :indeterminate="true"
            :variant="false"
            :disabled="false"
        >
            indeterminate
        </BaseCheckbox>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BaseToggle from "./components/base/base-toggle/BaseToggle.vue"
import BaseCheckbox from "./components/base/base-checkbox/BaseCheckbox.vue"
import { Sizes, Types } from "./components/base/base-checkbox/types"

const selected = ref(false)
const selected1 = ref(false)
const selected2 = ref(false)

const checked = (status: any) => {
    selected.value = status
    console.log(status)
}
</script>
