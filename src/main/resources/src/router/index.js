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
      component: () => import('@/components/home')
    },
    {
      path: '/forgotPsw',
      name: 'ForgotPsw',
      component: () => import('@/components/features/login/forgot-psw')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/components/features/register')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/components/not-found')
    },
  ]
})

router.beforeEach(routerGuardHandler)

export default router
