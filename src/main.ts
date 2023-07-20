
import { createSSRApp } from "vue";
import App from "./App.vue";
import "./static/css/them.scss"
import uviewPlus from "uview-plus";
import messages from './locale/index'
import { createI18n  } from 'vue-i18n'
import { Pinia } from "./plugins/pinia/pinia";
 
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}
 
export function createApp() {
  const app = createSSRApp(App);
  const i18n = createI18n(i18nConfig);
  
  app.use(i18n);
  app.use(Pinia);
  app.use(uviewPlus);

  return {
    app,
  };
}
 
