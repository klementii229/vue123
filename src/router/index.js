import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import SearchResults from '@/views/SearchResults.vue'
import Booking from '@/views/Booking.vue'
import BookingManagement from '@/views/BookingManagement.vue'
import SeatSelection from '@/views/SeatSelection.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/booking/:code',
    name: 'BookingManagement',
    component: BookingManagement
  },
  {
    path: '/booking/:code/seats',
    name: 'SeatSelection',
    component: SeatSelection
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router 