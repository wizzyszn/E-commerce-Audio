// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons

// Create a Vuetify instance
const vuetify = createVuetify();
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
const app = createApp(App)
app.use(router)
app.use(store);
app.use(Toast);
app.use(vuetify);
app.mount('#app')
