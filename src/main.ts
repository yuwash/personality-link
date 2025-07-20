import { createApp } from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@mdi/font/css/materialdesignicons.min.css';
import { i18n } from './i18n';
import './style.css';
import App from './App.vue';

const app = createApp(App);
app.use(Buefy);
app.use(i18n);
app.mount('#app');
