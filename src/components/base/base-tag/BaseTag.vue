<template>
  <section :class="['base-tag', `base-tag--is-${status || Types.Default}`]">
    <Suspense>
      <BaseIcon :size="Sizes.S" :type="statusIcon[status]?.type" :name="statusIcon[status]?.name" />
    </Suspense>
    <span>
      {{ status === 'damage' ? `${damage} Daños` : status === 'warning' ? 'Bloqueada' : 'Default' }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type Name, Types } from './types';
import BaseIcon from '@ui/base/base-icon/BaseIcon.vue';
import { Types as TypesICon, Sizes } from '@ui/base/base-icon/types';

const { status, damage } = defineProps<Name>();

// Icons for status reference
const statusIcon = {
  damage: { type: TypesICon.FEEDBACK, name: 'IconFeedbackCheck' },
  warning: { type: TypesICon.LOCATION, name: 'IconLocationCar' },
  [Types.Default]: { type: TypesICon.ARROW, name: 'IconArrowCircleDown' }
};
</script>

<style src="./BaseTag.scss" lang="scss"></style>