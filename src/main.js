// import './assets/main.css'
import './assets/adminlte/plugins/fontawesome-free/css/all.min.css';
import './assets/adminlte/dist/css/adminlte.min.css';

import './assets/adminlte/plugins/jquery/jquery.min.js';
import './assets/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import './assets/adminlte/dist/js/adminlte.min.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import axios from "axios";

import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGoodTablePlugin);
app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;

app.mount('#app');
