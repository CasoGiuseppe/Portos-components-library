<template>
  <section
    ref="observer"
    style="width: 100%;
    height: 100vh;
    background-color: red;"
  >
    observable
  </section>
</template>

<script setup lang="ts">
import useResizeObserver from "@/shared/composables/useResizeObserver"
import { onMounted, ref } from "vue";
const observer = ref(null);

const showResizeData = ({ width, height }: { width: number, height: number}): any => console.table({ width, height })
const { createObserver } = useResizeObserver({ action: showResizeData });

onMounted(() => {
  if(!observer.value) return;
  createObserver({
    trigger: observer.value
  })
})
</script>
