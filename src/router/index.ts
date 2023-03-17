import { createRouter, createWebHistory } from 'vue-router'

import PageFruits from '../views/Fruits.vue'
import PageFavorites from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fruits',
      component: PageFruits
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: PageFavorites
    }
  ]
})

export default router
