import '@/assets/style/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './plugins';
import router from './plugins/vue-router';

const app = createApp(App);

app.use(router);
app.use(createPinia());

router.isReady().then(() => {
    app.mount('#app');
});
