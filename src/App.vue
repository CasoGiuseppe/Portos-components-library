<template>
  <section>
    {{ selected }}
    <BaseCheckbox
      :id="'123'"
      v-model="selected"
      :status="Types.ERROR"
      :indeterminate="true"
      :disabled="false"
      :size="Sizes.M"
      @checked="status"
    >
      <template #label>Test input</template>
    </BaseCheckbox>
  </section>

  <section
    :style="{
      display: 'flex',
      gap: '10px',
      padding: '10px',
      'background-color': 'white'
    }"
  >
    <BaseToggle @checked="status"> asdasd </BaseToggle>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseToggle from './components/base/base-toggle/BaseToggle.vue'
import BaseCheckbox from './components/base/base-checkbox/BaseCheckbox.vue'
import { Sizes, Types } from './components/base/base-checkbox/types'

const selected = ref(false)
const selected1 = ref(false)
const selected2 = ref(false)

const status = (status: any) => {
  console.log(status)
}
</script>
