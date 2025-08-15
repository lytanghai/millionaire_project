import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/components/Homepage.vue'
import Analyze from '@/views/Analyze.vue'
import Authentication from '@/views/Authentication.vue'
import { getToken, isTokenExpired, removeToken } from '@/assets/token'
import API from '@/components/API.vue'

const routes = [
  { path: '/', name: 'Home', component: Homepage },
  { path: '/analyze', name: 'Analyze', component: Analyze },
  { path: '/login', name: 'Login', component: Authentication },
  { path: '/test', name:'Test',component: API }, // <-- this makes /test show your UI

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const token = getToken()

  if (authRequired) {
    if (!token) {
      return next('/login')
    }
    if (isTokenExpired(token)) {
      removeToken()
      return next('/login')
    }
  }
  next()
})

export default router
