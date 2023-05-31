import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Form from "../views/Form.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/register",
      component: Form
    },
    {
      path: "/edit/:id",
      component: Form
    }
  ]
})

export default router
