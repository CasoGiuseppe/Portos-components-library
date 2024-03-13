<template>
    <div style="width: 35%; padding: 15px; background: #ccc;">
        <BaseInput
            model="init value"
            @update:model="update"
            @change="change"
            @focus="focus"
        >
            <template #label>Label</template>
            <template #message>Help Text</template>
        </BaseInput>
    </div>
</template>
<script setup lang="ts">
import BaseInput from './components/base/base-input/BaseInput.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import ViewSearch from './components/base/base-search/ViewSearch.vue'

const update = (value: string) => console.log('update', value)
const change = (value: string) => console.log('change', value)
const focus = () => console.log('focus')
</script>
