import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import http from "./plugins/http";

Vue.config.productionTip = false;
Vue.use(http);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
