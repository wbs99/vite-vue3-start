import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue'),
  },
  {
    path: '/home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/NotFoundPage.vue'),
  },
]
const history = createWebHistory()

export const router = createRouter({ history, routes })
