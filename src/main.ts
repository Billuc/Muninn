import "./assets/style.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "quasar/src/css/index.sass";

import { Quasar } from "quasar";
import { createApp } from "vue";

import App from "./App.vue";
import containerPlugin from "./plugins/di";
import router from "./plugins/router";

const app = createApp(App);

app.use(router);
app.use(containerPlugin);
app.use(Quasar, { plugins: {}, config: { dark: true } });

app.mount("#app");
