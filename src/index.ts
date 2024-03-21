// Importa los componentes y las historias desde la carpeta src/stories
import type { App } from 'vue'
import BaseButton from './components/base/base-button/BaseButton.vue'
import BaseCard from './components/base/base-card/BaseCard.vue'
import BaseIcon from './components/base/base-icon/BaseIcon.vue'
import BaseInput from './components/base/base-input/BaseInput.vue'
import BaseSearch from './components/base/base-search/BaseSearch.vue'
import BaseTable from './components/base/base-table/BaseTable.vue'

export * from './components/icons'
export * from './shared/helpers'
export * from './components/utilities/validation/useValidation'

// Exporta los componentes individualmente
export { BaseCard, BaseTable, BaseIcon, BaseSearch, BaseInput, BaseButton }

// Proporcionar una función de instalación para la instalación global
export function install(app: App): void {
  app.component('BaseButton', BaseButton)
  app.component('BaseInput', BaseInput)
  app.component('BaseCard', BaseCard)
  app.component('BaseTable', BaseTable)
  app.component('BaseIcon', BaseIcon)
  app.component('BaseSearch', BaseSearch)
}
