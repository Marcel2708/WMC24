import { createApp } from 'vue'
import App from './App.vue'
import axios from './plugins/axios';
import router from './router'

const app = createApp(App);

// Make Axios available globally in your Vue app
app.config.globalProperties.$http = axios;
app.use(router);

app.mount('#app');
