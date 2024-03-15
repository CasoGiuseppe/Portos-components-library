<template>
    <div style="width: 35%; padding: 15px; background: #ccc;">
        <BaseInput
            v-model="initValue"
            required
            @update:modelValue="update"
            @change="change"
            @focus="focus"
            @invalid="setInvalid"
        >
            <template #label>Label</template>
            <template #message>Input allowed letters, numbers and spaces with a min lenght of 5</template>
            <template v-if="error" #error><BaseIcon name="IconFeedbackError" :type="Types.FEEDBACK" :size="Sizes.XS" /> input validation failed</template>
        </BaseInput>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from './components/base/base-input/BaseInput.vue';
import BaseIcon from './components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from './components/base/base-icon/types'
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import ViewSearch from './components/base/base-search/ViewSearch.vue'

const error = ref<boolean>(false);
const initValue = ref<string | null>(null);

const update = (value: string) => console.log('update', value)
const change = (value: string) => console.log('change', value)
const focus = () => console.log('focus')
const setInvalid = (value: boolean) => error.value = value
</script>
