
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const Pinia = createPinia();
Pinia.use(piniaPluginPersistedstate)
export { Pinia };