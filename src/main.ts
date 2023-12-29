
import { createSSRApp } from "vue";
import App from "./App.vue";
import "./static/css/them.scss"
// @ts-ignore
import uviewPlus from "uview-plus";
// npm i --save-dev @types/uview-plus
import messages from './locale/index'
// import { createI18n } from 'vue-i18n'
// import TIMPlugins from "./plugins/TIM-plugin";
import { Pinia } from "./plugins/pinia/pinia";
import 'default-passive-events'
 // 引入 Vant 样式
import Vant from 'vant';
import 'vant/lib/index.css';
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}
 
export function createApp() {
  const app = createSSRApp(App);
  // const i18n = createI18n(i18nConfig);
  
  // app.use(i18n);
  app.use(Pinia);
  app.use(uviewPlus);
  app.use(Vant);
  // app.use(TIMPlugins);

  return {
    app,
  };
}
 
