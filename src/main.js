import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { vfmPlugin } from "vue-final-modal";
import Toaster from "@meforma/vue-toaster";
import "vue-file-selector/dist/main.css";

// import the FileSelector plugin
import FileSelector from "vue-file-selector";

import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";

createApp(App)
  .use(router)
  .use(vfmPlugin)
  .use(Toaster)
  .use(FileSelector)
  .use(VCalendar, {})
  .mount("#app");
