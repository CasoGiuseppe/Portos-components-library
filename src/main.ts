import { createApp } from 'vue'
import ClickOutside from "@ui/utilities/directives/clickOutside";
import App from './App.vue'

const app = createApp(App);
app.directive('click-outside', ClickOutside);
app.mount('#app')
