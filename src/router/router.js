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
          path: "detailedWeather/:stationName",
          component: () => import("../pages/StationWeather.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "api",
          component: () => import("../pages/API.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "parameters",
          component: () => import("../pages/Parameters.vue"),

          meta: { requiresAuth: true },
        },

        {
          path: "forecast",
          component: () => import("../pages/Forecast.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "map",
          component: () => import("../pages/WeatherMap.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "weather",
          component: () => import("../pages/Weather.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "advisories",
          component: () => import("../pages/Advisories.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "about",
          component: () => import("../pages/AboutNCHMLayout.vue"),
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
