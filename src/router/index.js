import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../components/login/loginComponent')
    },
    {
      path: '/home',
      name: 'home',
    
      component: () => import('../components/homePage/homeComponent'),
      meta:{requireAuth:true}
    },
    {
      path: '/register',
      name: 'register',
      
      component: () => import('../components/register/registerComponent')
    },
  ]
})

router.beforeEach((to, from, next) => {
 // next()
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


router.beforeResolve((to,from,next)=>{
  if(to.name){
    NProgress.start()
  }
  next()
})
router.afterEach((to,from)=>{
  NProgress.done()
})

export default router
