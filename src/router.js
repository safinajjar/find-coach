import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from './pages/coaches/CoachesList.vue'
import store from './store'
import { defineAsyncComponent } from 'vue'

const CoachDetails = defineAsyncComponent(() => import('./pages/coaches/CoachDetails.vue'))
const CoachRegister = defineAsyncComponent(() => import('./pages/coaches/CoachRegister.vue'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'))
const RequestsList = defineAsyncComponent(() => import('./pages/requests/RequestsList.vue'))
const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'))
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      name: 'coachesList',
      path: '/coaches',
      component: CoachesList,
    },
    {
      name: 'coachDetails',
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          // /coaches/:id/contact
          name: 'contactCoach',
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      name: 'register',
      path: '/register',
      component: CoachRegister,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: 'requestsList',
      path: '/requests',
      component: RequestsList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: 'notFound',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
})

// navigation guards
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next({ name: 'coachesList' })
  } else {
    next()
  }
})

export default router
