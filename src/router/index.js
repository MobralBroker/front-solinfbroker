import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/login/loginComponent')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../components/homePage/homeComponent'),
      meta: { requireAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register/registerComponent')
    },
    {
      path: '/panel',
      name: 'panel',
      component: () => import('../components/panel/StockPanel.vue'),
      meta: { requireAuth: true }
    },

    {
      path: '/wallet',
      name: 'wallet',

      component: () => import('../components/panel/walletPanel.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/',
        query: { redirect: to.fullPath } // Passa a rota original como parâmetro de consulta
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router

