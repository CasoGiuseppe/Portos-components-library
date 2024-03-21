// Importar los componentes
import type { App } from 'vue'
// base
import BaseButton from './components/base/base-button/BaseButton.vue'
import BaseCard from './components/base/base-card/BaseCard.vue'
import BaseIcon from './components/base/base-icon/BaseIcon.vue'
import BaseInput from './components/base/base-input/BaseInput.vue'
import BaseSearch from './components/base/base-search/BaseSearch.vue'
import BaseTable from './components/base/base-table/BaseTable.vue'
// nav
import NavigationItem from './components/navigation/navigation-item/NavigationItem.vue'
// defaults
import DefaultError from './components/defaults/exceptions/default-error/DefaultError.vue'
import DefaultLoader from './components/defaults/loaders/default-loader/DefaultLoader.vue'

// Exporta los componentes
export {
  BaseButton,
  BaseCard,
  BaseIcon,
  BaseInput,
  BaseSearch,
  BaseTable,
  NavigationItem,
  DefaultLoader,
  DefaultError
}

export * from './components/icons'
export * from './shared/helpers'
export * from './components/utilities/validation/useValidation'

// Proporcionar una función de instalación para la instalación global
export function install(app: App): void {
  app.component('BaseButton', BaseButton)
  app.component('BaseCard', BaseCard)
  app.component('BaseIcon', BaseIcon)
  app.component('BaseInput', BaseInput)
  app.component('BaseSearch', BaseSearch)
  app.component('BaseTable', BaseTable)
  app.component('NavigationItem', NavigationItem)
  app.component('DefaultLoader', DefaultLoader)
  app.component('DefaultError', DefaultError)
}
