if(!self.define){let e,n={};const u=(u,i)=>(u=new URL(u+".js",i).href,n[u]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=u,e.onload=n,document.head.appendChild(e)}else e=u,importScripts(u),n()})).then((()=>{let e=n[u];if(!e)throw new Error(`Module ${u} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let s={};const c=e=>u(e,r),o={module:{uri:r},exports:s,require:c};n[r]=Promise.all(i.map((e=>o[e]||c(e)))).then((e=>(l(...e),s)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_nuxt/BackButton.ddd60e00.css",revision:null},{url:"_nuxt/BackButton.vue.b9d55462.js",revision:null},{url:"_nuxt/Background.vue.2dca8cfa.js",revision:null},{url:"_nuxt/CreateEvent.vue.24111230.js",revision:null},{url:"_nuxt/entry.af14b90f.css",revision:null},{url:"_nuxt/entry.fdeab8e2.js",revision:null},{url:"_nuxt/EntryList.vue.a13cfe6d.js",revision:null},{url:"_nuxt/error-404.95c28eb4.css",revision:null},{url:"_nuxt/error-404.a4014abb.js",revision:null},{url:"_nuxt/error-500.a435ff56.js",revision:null},{url:"_nuxt/error-500.e798523c.css",revision:null},{url:"_nuxt/eventStore.e7e86ec9.js",revision:null},{url:"_nuxt/FABButton.vue.20dd3cf1.js",revision:null},{url:"_nuxt/index.48cd3a65.js",revision:null},{url:"_nuxt/index.504780f4.js",revision:null},{url:"_nuxt/index.5054022f.js",revision:null},{url:"_nuxt/index.51cc1061.css",revision:null},{url:"_nuxt/index.565c97b8.js",revision:null},{url:"_nuxt/index.5f1355b3.js",revision:null},{url:"_nuxt/index.95b8db6d.js",revision:null},{url:"_nuxt/index.d1b0eca3.js",revision:null},{url:"_nuxt/index.d40b353f.css",revision:null},{url:"_nuxt/index.ded0c512.js",revision:null},{url:"_nuxt/index.e2e2e9a7.js",revision:null},{url:"_nuxt/index.eafddbc5.js",revision:null},{url:"_nuxt/index.ff624e87.js",revision:null},{url:"_nuxt/Input.vue.fbfbc076.js",revision:null},{url:"_nuxt/InputField.vue.bc217c63.js",revision:null},{url:"_nuxt/ListForm.vue.0890baff.js",revision:null},{url:"_nuxt/MultilineInput.vue.537991f1.js",revision:null},{url:"_nuxt/NoteForm.vue.fa719395.js",revision:null},{url:"_nuxt/noteStore.596e539a.js",revision:null},{url:"_nuxt/PageHeading.11408346.css",revision:null},{url:"_nuxt/PageHeading.bc1d6c96.js",revision:null},{url:"_nuxt/SelectField.672a9471.css",revision:null},{url:"_nuxt/SelectField.vue.2b791b6b.js",revision:null},{url:"_nuxt/TagSelecter.vue.3494ce3c.js",revision:null},{url:"_nuxt/workbox-window.prod.es5.a7b12eab.js",revision:null},{url:"200",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"404",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"apple-touch-icon.png",revision:"d3c3fe7704fd47ee4af75642da8e2b6e"},{url:"config",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"events",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"favicon.ico",revision:"e69ef478fa4f698303645169e52d512c"},{url:"icon.svg",revision:"b60f4f2ac7db7ba2cebbbc6530b0e83b"},{url:"/Muninn/",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"journal",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"lists",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"notes",revision:"ec7fc90ccf57eecccba597f99058e387"},{url:"pwa-192x192.png",revision:"166b2234fb7a77c9e01062ca0c1847c8"},{url:"pwa-512x512.png",revision:"a9e3a3c851b2f3b12997b1bf8f8d18b1"},{url:"manifest.webmanifest",revision:"80a231ee1fb1e53fa3f8f9119e64f942"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/")))}));
