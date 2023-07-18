 
import { createSSRApp } from "vue";
import App from "./App.vue";
import   "./static/css/them.scss"
import uviewPlus from "uview-plus";
// import installHttp from "@/request/request"; 
import { Pinia } from "./plugins/pinia/pinia"; 
export function createApp() {
  const app = createSSRApp(App);
  // installHttp(uni);
  app.use(Pinia);
  app.use(uviewPlus);

  return {
    app,
  };
}
