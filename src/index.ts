// Importar los componentes y utilidades
import type { App } from "vue"

// base components
import BaseButton from "./components/base/base-button/BaseButton.vue"
import BaseCard from "./components/base/base-card/BaseCard.vue"
import BaseCheckbox from "./components/base/base-checkbox/BaseCheckbox.vue"
import BaseIcon from "./components/base/base-icon/BaseIcon.vue"
import BaseInput from "./components/base/base-input/BaseInput.vue"
import BaseLink from "./components/base/base-link/BaseLink.vue"
import BaseList from "./components/base/base-list/BaseList.vue"
import BaseSearch from "./components/base/base-search/BaseSearch.vue"
import BaseTable from "./components/base/base-table/BaseTable.vue"
import BaseTag from "./components/base/base-tag/BaseTag.vue"
import BaseTextarea from "./components/base/base-textarea/BaseTextarea.vue"
import BaseToggle from "./components/base/base-toggle/BaseToggle.vue"
import BaseDropdown from "./components/base/base-dropdown/BaseDropdown.vue"
import BaseAccordion from "./components/base/base-accordion/BaseAccordion.vue"

// navigation components
import NavigationItemContextual from "./components/navigation/contextual/navigation-item/NavigationItemContextual.vue"
import NavigationItem from "./components/navigation/main/navigation-item/NavigationItem.vue"

// default components
import DefaultError from "./components/defaults/exceptions/default-error/DefaultError.vue"
import DefaultLoader from "./components/defaults/loaders/default-loader/DefaultLoader.vue"

// composables and directives
import useIntersectionObserver from "./shared/composables/useIntersectionObserver"
import { validateValueCollectionExists } from "./components/utilities/validation/useValidation"
import clickOutside from "./components/utilities/directives/clickOutside"
import useResizeObserver from "./shared/composables/useResizeObserver"

// tools
import SliderTool from "./components/tools/slider-tool/SliderTool.vue"
import FieldSetList from "./components/tools/fieldset-list/FieldSetList.vue"
import ModalPanel from "./components/tools/modal-panel/ModalPanel.vue"

// types
import type {
    UniqueId as UniqueIconId,
    Names as IconNames
} from "./components/base/base-icon/types"
import {
    Sizes as IconSizes,
    Types as IconTypes
} from "./components/base/base-icon/types"

// Exportar componentes, utilidades, directivas y tipos
export {
    // base components
    BaseButton,
    BaseCard,
    BaseCheckbox,
    BaseIcon,
    BaseInput,
    BaseLink,
    BaseList,
    BaseSearch,
    BaseTable,
    BaseTag,
    BaseTextarea,
    BaseToggle,
    BaseDropdown,
    BaseAccordion,

    // navigation components
    NavigationItemContextual,
    NavigationItem,

    // default components
    DefaultLoader,
    DefaultError,

    // composables and directives
    validateValueCollectionExists,
    useIntersectionObserver,
    clickOutside,
    useResizeObserver,

    // tools
    SliderTool,
    FieldSetList,
    ModalPanel,

    // types with renamed exports
    type UniqueIconId,
    type IconNames,
    IconSizes,
    IconTypes
}

// Exportar todo desde otros módulos
export * from "./components/icons"

// Proporcionar una función de instalación para la instalación global
export function install(app: App): void {
    // base components
    app.component("BaseButton", BaseButton)
    app.component("BaseCard", BaseCard)
    app.component("BaseCheckbox", BaseCheckbox)
    app.component("BaseIcon", BaseIcon)
    app.component("BaseInput", BaseInput)
    app.component("BaseLink", BaseLink)
    app.component("BaseList", BaseList)
    app.component("BaseSearch", BaseSearch)
    app.component("BaseTable", BaseTable)
    app.component("BaseTag", BaseTag)
    app.component("BaseTextarea", BaseTextarea)
    app.component("BaseToggle", BaseToggle)
    app.component("BaseDropdown", BaseDropdown)
    app.component("BaseAccordion", BaseAccordion)
    
    //tools
    app.component("SliderTool", SliderTool)
    app.component("FieldSetList", FieldSetList)
    app.component("ModalPanel", ModalPanel)

    // navigation components
    app.component("NavigationItemContextual", NavigationItemContextual)
    app.component("NavigationItem", NavigationItem)

    // default components
    app.component("DefaultLoader", DefaultLoader)
    app.component("DefaultError", DefaultError)
}
