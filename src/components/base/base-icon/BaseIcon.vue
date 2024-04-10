<template>
    <Suspense>
      <picture class="base-icon">
          <Transition
            appear
            name="appear-icon"
            mode="out-in"
          >
            <component
              v-if="name !== null"
              data-testID="ui-icon"
              :key="id"
              :is="asyncComponent"
              :id="id"
              :class="[`base-icon--is-${size}`]"
            />
          </Transition>
      </picture>
    </Suspense>
</template>
<script lang="ts" setup>
import { onMounted, onUpdated, type PropType, shallowRef } from 'vue'
import { Types, Sizes, type UniqueId } from './types'
import { validateValueCollectionExists } from '@/components/utilities/validation/useValidation'

onMounted(() => importIcon({ name: props.name }))
onUpdated(() => importIcon({ name: props.name }))

const asyncComponent = shallowRef<null | any>(null)
const props = defineProps({
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
    default: null
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

const importIcon = ({ name }: { name: string }): void => {
  import(`../../icons/${props.type}/${name}.vue`)
    .then((module) => asyncComponent.value = module.default)
    .catch((error) => console.error(error))
}
</script>
<style src="./BaseIcon.scss" lang="scss"></style>
