import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "homepage",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/user/:id",
    name: "userdetail",
    component: () => import("../pages/user.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
