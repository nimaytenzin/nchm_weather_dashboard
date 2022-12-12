import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router/router";
import { vfmPlugin } from "vue-final-modal";
import Toaster from "@meforma/vue-toaster";

import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";

createApp(App)
  .use(router)
  .use(vfmPlugin)
  .use(Toaster)
  .use(VCalendar, {})
  .mount("#app");
