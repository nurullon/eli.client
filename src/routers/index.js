import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/_404.vue'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import AppView from '@/pages/AppView.vue'
import navigations from '@/routers/navigations.js'
import AuthRegisterComponent from '../pages/auth/register/AuthRegisterComponent.vue'
import AuthLoginView from '../pages/auth/login/AuthLoginView.vue'
import OtpVerificationPage from '@/pages/auth/OtpVerificationPage.vue'
import AuthView from '@/pages/auth/AuthView.vue'
import { useCookies } from 'vue3-cookies'

const accessNavigation = navigations

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AppView',
      component: AppView,
      redirect: { name: 'AuthView' },
      children: [
        {
          path: '/auth',
          name: 'AuthView',
          component: AuthView,
          redirect: {
            name: 'AuthLogin',
          },
          children: [
            {
              path: 'login',
              name: 'AuthLogin',
              component: AuthLoginView,
            },
            {
              path: 'register',
              name: 'AuthRegisterWithEri',
              component: AuthRegisterComponent,
            },
          ]
        },
        {
          path: '/dashboard',
          name: 'DashboardView',
          component: DashboardView,
          redirect: { name: accessNavigation[0]?.name },
          children: accessNavigation
        },
        {
          path: '/otp/:email?',
          name: 'OtpVerificationPage',
          component: OtpVerificationPage,
          props: true,
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'DashboardNotFound'
    }
  ]
})

const routerFactory = (i18n) => {
  router.beforeEach((to, from, next) => {
    document.title = to.name
    const { cookies } = useCookies()
    const accessToken = cookies.get("token")

    if (accessToken) {
      if (to.path.includes('dashboard')) {
        return next()
      } else {
        return next({ name: 'DashboardView' })
      }
    } else {
      if (!to.path.includes('dashboard')) {
        return next()
      } else {
        return next({ name: 'AuthView' })
      }
    }
  })

  return router
}

export default routerFactory

export { router }