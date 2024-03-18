<template>
  <div>
    <!-- Ejemplo de uso link -->
    <p style="color: white">
      <BaseLink
        :elementType="ElementLink.A"
        :disabled="disable"
        :variant="true"
        :size="SizesLink.M"
        id="1"
        label="Visit Google"
        href="https://www.google.com"
      >
        <slot>
          Visit Google as link
          <BaseIcon :size="IconSizes.S" />
        </slot>
      </BaseLink>
      ahora tenemos otro texto aqui como prueba
    </p>

    <!-- Ejemplo de uso como ancla -->
    <BaseLink
      :elementType="ElementLink.A"
      :variant="true"
      :size="SizesLink.M"
      label="Anclaje en la vista"
      href="https://www.google.com"
    >
      Url Externa
    </BaseLink>

    <p>
      hola como estan
      <BaseLink
        :elementType="ElementLink.A"
        :size="SizesLink.S"
        label="Anclaje en la vista"
        href="#ancla"
      >
        Anclaje
      </BaseLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '../base-icon/BaseIcon.vue'
import { Sizes as IconSizes } from '../base-icon/types'
import BaseLink from './BaseLink.vue'
import { SizesLink, ElementLink } from './types'

const disable = true
</script>
