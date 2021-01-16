import Vue from 'vue'
import Router from 'vue-router'
import routerGuardHandler from './router-guard'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/features/login')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/components/Home')
    },
    {
      path: '/forgotPsw',
      name: 'ForgotPsw',
      component: () => import('@/components/features/login/forgot-psw')
    },
  ]
})

router.beforeEach(routerGuardHandler)

export default router
