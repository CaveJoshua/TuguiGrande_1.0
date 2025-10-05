import { createApp } from 'vue';
import App from './App.vue';
import router from './index.js'; // <-- IMPORT the router
import './assets/style.css';

const app = createApp(App);

app.use(router); // <-- TELL VUE to use the router
app.mount('#app');
