if(!self.define){let e,n={};const i=(i,r)=>(i=new URL(i+".js",r).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,u)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(n[l])return;let s={};const o=e=>i(e,l),c={module:{uri:l},exports:s,require:o};n[l]=Promise.all(r.map((e=>c[e]||o(e)))).then((e=>(u(...e),s)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_nuxt/Background.vue.226a9024.js",revision:null},{url:"_nuxt/CalendarEvents.vue.018602cc.js",revision:null},{url:"_nuxt/Dialog.vue.04f2e674.js",revision:null},{url:"_nuxt/entry.2fb70ca1.js",revision:null},{url:"_nuxt/entry.640599a0.css",revision:null},{url:"_nuxt/EntryList.vue.66489a87.js",revision:null},{url:"_nuxt/error-404.95c28eb4.css",revision:null},{url:"_nuxt/error-404.ecd6b727.js",revision:null},{url:"_nuxt/error-500.32ccdcfc.js",revision:null},{url:"_nuxt/error-500.e798523c.css",revision:null},{url:"_nuxt/eventStore.f4201045.js",revision:null},{url:"_nuxt/FABButton.vue.c7857c65.js",revision:null},{url:"_nuxt/index.07cea6b8.js",revision:null},{url:"_nuxt/index.0e822314.js",revision:null},{url:"_nuxt/index.1dfe98c4.js",revision:null},{url:"_nuxt/index.377d1c4f.js",revision:null},{url:"_nuxt/index.8ca89afb.js",revision:null},{url:"_nuxt/index.9b3d7675.js",revision:null},{url:"_nuxt/index.9fcc7bfc.js",revision:null},{url:"_nuxt/index.a340bf0b.js",revision:null},{url:"_nuxt/index.a9cb0fc4.js",revision:null},{url:"_nuxt/index.adc71137.js",revision:null},{url:"_nuxt/isNaN.30d01d11.js",revision:null},{url:"_nuxt/listStore.044056dc.js",revision:null},{url:"_nuxt/MultilineField.vue.048823b1.js",revision:null},{url:"_nuxt/noteStore.8bc90c06.js",revision:null},{url:"_nuxt/PageHeading.99ada2df.js",revision:null},{url:"_nuxt/Tag.vue.a23b0b30.js",revision:null},{url:"_nuxt/TagSelecter.vue.9198336c.js",revision:null},{url:"_nuxt/workbox-window.prod.es5.a7b12eab.js",revision:null},{url:"200",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"404",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"apple-touch-icon.png",revision:"d3c3fe7704fd47ee4af75642da8e2b6e"},{url:"config",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"events",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"favicon.ico",revision:"e69ef478fa4f698303645169e52d512c"},{url:"icon.svg",revision:"b60f4f2ac7db7ba2cebbbc6530b0e83b"},{url:"/second-brain/",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"journal",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"lists",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"notes",revision:"40cb5e12af80277a91db7ce5209ef212"},{url:"pwa-192x192.png",revision:"166b2234fb7a77c9e01062ca0c1847c8"},{url:"pwa-512x512.png",revision:"a9e3a3c851b2f3b12997b1bf8f8d18b1"},{url:"manifest.webmanifest",revision:"999487ac5232c6f5efb7c45ea96e3d31"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/")))}));
