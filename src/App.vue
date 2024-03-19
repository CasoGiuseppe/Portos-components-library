<template>
    <section>
        <Suspense>
            <BaseIcon name="IconArrowCircleUp" :type="Types.ARROW" :size="Sizes.S"></BaseIcon>
        </Suspense>
    </section>
</template>
<script setup lang="ts">
import BaseIcon from './components/base/base-icon/BaseIcon.vue';
import { Types, Sizes } from './components/base/base-icon/types'
</script>
