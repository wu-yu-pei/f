import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

import Unocss from 'unocss/vite';

import AutoImport from 'unplugin-auto-import/vite';

import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Pages(),
    Unocss(),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ],
});
