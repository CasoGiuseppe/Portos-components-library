import { createApp } from 'vue'
import ClickOutside from "@ui/utilities/directives/clickOutside";
import App from './App.vue'
import router from './router';

const app = createApp(App);
app
    .directive('click-outside', ClickOutside)
    .use(router);
    
app.mount('#app')
