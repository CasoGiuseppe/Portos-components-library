<template>
  <picture class="base-icon">
    <Transition
      name="appear-icon"
      mode="out-in"
    >
      <component
        data-testID="ui-icon"
        :is="asyncComponent"
        :id="id"
        :key="id"
        :class="[`base-icon--is-${size}`]"
      />
    </Transition>
  </picture>
</template>
<script lang="ts" setup>
import { Types, Sizes, type UniqueId } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'
import { onMounted, type PropType, shallowRef } from 'vue'

onMounted(() => {
  import(`../../icons/${type}/${name}.vue`)
    .then((module) => {
      asyncComponent.value = module.default
    })
    .catch((error) => {
      console.log(error)
    })
})

const asyncComponent = shallowRef<null | any>(null)

const { name, type } = defineProps({
  /**
   * Set the unique id of the ui button
   */
  id: {
    type: String as PropType<UniqueId>,
    default: 'iconId'
  },

  /**
   * Set icon name to get svg file
   */
  name: {
    type: String as PropType<string>,
    default: 'IconNavigationCloseS'
  },

  /**
   * Set the icon type family
   */
  type: {
    type: String as PropType<Types>,
    default: Types.NAVIGATION,
    validator: (prop: Types) => validateValueCollectionExists({ collection: Types, value: prop })
  },

  /**
   * Set the icon size [L, M, S, XS]
   */
  size: {
    type: String as PropType<Sizes>,
    default: Sizes.M,
    validator: (prop: Sizes) => validateValueCollectionExists({ collection: Sizes, value: prop })
  }
})
</script>
<style src="./BaseIcon.scss" lang="scss"></style>
