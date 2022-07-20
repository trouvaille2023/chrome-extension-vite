import { createApp } from 'vue';
import App from './components/Setting.vue';
import '../styles/style.css';
import './setting.css';
// import NaiveUi from 'naive-ui';
// // 通用字体
import 'vfonts/Lato.css';
// // 等宽字体
import 'vfonts/FiraCode.css';

import router from '../router';
createApp(App)
    .use(router)
    // .use(NaiveUi)
    .mount('#app');
