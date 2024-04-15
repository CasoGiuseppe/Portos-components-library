<template>
    <section>
        <BaseFieldset @send="getValues">
            <template #label>label</template>
        </BaseFieldset>
    </section>
</template>

<script setup lang="ts">
import BaseFieldset from '@ui/base/base-fieldset/BaseFieldset.vue'
const getValues = (e) => console.log(e)
</script>
