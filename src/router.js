import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import CoachRegister from './pages/coaches/CoachRegister.vue'
import RequestsList from './pages/requests/RequestsList.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
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
    },
    {
      name: 'requestsList',
      path: '/requests',
      component: RequestsList,
    },
    {
      name: 'notFound',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
})

export default router
