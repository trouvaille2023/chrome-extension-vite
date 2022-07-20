import { createApp } from 'vue';
import App from './components/Popup.vue';
// import NaiveUi from 'naive-ui';
import '../styles/style.css';
import './popup.css';

// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

import router from '../router';
createApp(App)
    .use(router)
    // .use(NaiveUi)
    .mount('#app');
