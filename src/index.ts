// Importa los componentes y las historias desde la carpeta src/stories
import type { App } from 'vue'
import BaseCard from './components/base/base-card/BaseCard.vue';
import BaseTable from './components/base/base-table/BaseTable.vue';
import BaseIcon from './components/base/base-icon/BaseIcon.vue';
import BaseSearch from './components/base/base-search/BaseSearch.vue';

export * from './components/icons';
export * from './shared/helpers';

// Exporta los componentes individualmente
export { BaseCard, BaseTable, BaseIcon, BaseSearch };

// Proporcionar una función de instalación para la instalación global
export function install(app: App): void {
  app.component('BaseCard', BaseCard);
  app.component('BaseTable', BaseTable);
  app.component('BaseIcon', BaseIcon);
  app.component('BaseSearch', BaseSearch);
}
