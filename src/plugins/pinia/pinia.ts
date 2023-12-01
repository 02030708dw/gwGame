
import { createPinia } from "pinia";
import { createUnistorage } from '../../uni_modules/pinia-plugin-unistorage/index.js'
const Pinia = createPinia();
Pinia.use(createUnistorage())
export { Pinia };