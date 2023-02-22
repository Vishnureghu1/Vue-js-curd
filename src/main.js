import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import "../src/assets/css/style.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
