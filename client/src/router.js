import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "username",
      component: () => import("./views/Username.vue")
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("./views/Stats.vue")
    }
  ]
});
