import { createRouter, createWebHistory } from 'vue-router'
import ExchangeForm from '@/components/ExchangeForm.vue'
import ExchangeHistory from '@/components/ExchangeHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: ExchangeForm },
    { path: '/exchange-form', component: ExchangeForm },
    { path: '/exchange-history', component: ExchangeHistory },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

export default router
