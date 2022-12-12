import { createRouter, createWebHistory } from "vue-router";
import { VerfiyToken } from "../dataservice/auth.service";
import LoginPage from "../pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/admin/",
      component: () => import("../layouts/adminLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/Dashboard.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "stations",
          component: () => import("../pages/Stations.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "intervals",
          component: () => import("../pages/Intervals.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "dailyforecasts",
          component: () => import("../pages/DailyForecast.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "advisories",
          component: () => import("../pages/Advisories.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "users",
          component: () => import("../pages/Users.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    let token = sessionStorage.getItem("token");
    if (token) {
      let verified = await VerfiyToken();
      if (!verified) {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
