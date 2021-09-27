import { createApp } from "vue";

// UI
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/scss/main.scss";
import FontAwesomeIcon from "./plugins/fontawesome"

import App from "./App.vue";
import router from "./router";
import store from "./store";

// Plugins
import { i18n } from "./plugins/i18n/i18n";
import Axios from "./plugins/axios";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(i18n)
  .use(Axios)
  .mount("#app");
