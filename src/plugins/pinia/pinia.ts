
import { createPinia } from "pinia";
import { createUnistorage } from '../../uni_modules/pinia-plugin-unistorage'
import TIMPlugin from "../TIM-plugin"
const Pinia = createPinia();
Pinia.use(createUnistorage())
Pinia.use(TIMPlugin)
export { Pinia };