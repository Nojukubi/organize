/// <reference types="vue/macros-global" />
/// <reference types="vite/client.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
