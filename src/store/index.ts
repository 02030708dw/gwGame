import { createPinia } from "pinia"; 
import { createUnistorage } from '../uni_modules/pinia-plugin-unistorage'
const pinia = createPinia();
pinia.use(createUnistorage());
export default pinia;
