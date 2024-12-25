import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    }
})

import {createPinia} from 'pinia';
const pinia = createPinia();

import App from './App.vue'

createApp(App)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
