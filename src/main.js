import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Toast);
app.mount('#app')
