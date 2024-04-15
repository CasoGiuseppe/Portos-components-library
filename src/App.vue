<template>
    <section>
        <BaseFieldset
            :fields="fields"
            @send="getValues"
        >
            <template #label>label</template>
        </BaseFieldset>
    </section>
</template>

<script setup lang="ts">
import BaseFieldset from '@ui/base/base-fieldset/BaseFieldset.vue'
import BaseCheckbox from './components/base/base-checkbox/BaseCheckbox.vue';
// import { shallowRef, type Component } from 'vue';

// const component = shallowRef<Component>(BaseCheckbox)
const fields = [
    {
        type: BaseCheckbox,
        label: 'label1',
        props: {
            id: 'label1',
        }
    }
]
const getValues = (e) => console.log(e)
</script>
