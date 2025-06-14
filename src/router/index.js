import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: ()=> import('../views/AuthLayout/ViewLogin.vue'),
      meta: {
        layout: 'auth',
        auth: false,
      }
    },
    {
      path: '/',
      name: 'Home',
      component: ()=> import('../views/MainLayout/ViewHome.vue'),
      meta: {
        layout: 'main',
        auth: true,
      }
    },
    {
      path: '/students',
      name: 'Students',
      component: ()=> import('../views/MainLayout/ViewStudents.vue'),
      meta: {
        layout: 'main',
        auth: true,
      }
    },
    {
      path: '/groups',
      name: 'Groups',
      component: ()=> import('../views/MainLayout/ViewGroups.vue'),
      meta: {
        layout: 'main',
        auth: true,
      }
    } 
  ],

  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})



router.beforeEach((to, from, next) => {
  const requireAuth = to?.meta.auth;
  const isAuth = store.getters['auth/isAuthenticated'];

  if (isAuth && to.path === '/login') {
    return next('/'); // Login sahifasiga kirgan bo‘lsa, lekin allaqachon login bo‘lsa, homega
  }

  if (requireAuth && !isAuth) {
    return next('/login'); // Himoyalangan sahifa va login bo‘lmagan foydalanuvchi
  }

  // Aks holda, ruxsat ber
  return next();
});


export default router
