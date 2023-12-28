 
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// @ts-ignore
import path from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // server: {
    //   host: false,
    // },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
  }, 
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~": path.resolve(__dirname, "."),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    plugins: [uni(),vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })],
  };
});
 