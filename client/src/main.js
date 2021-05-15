import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
