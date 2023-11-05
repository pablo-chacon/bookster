import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BookListView from '@/views/BookListView.vue'
import AdminBookListView from '@/views/AdminBookListView.vue'
import AdminProfileViewVue from '@/views/AdminProfileView.vue'
import GuestBookListView from '@/views/GuestBookListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView
    }, 
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView
    }, 
    {
      path: '/library/books',
      name: 'books',
      component: BookListView
    },
    {
      path: '/admin/books',
      name: 'adminBooks',
      component: AdminBookListView
    },
    {
      path: '/admin/users',
      name: 'adminProfile',
      component: AdminProfileViewVue
    },
    {
      path: '/guest/books',
      name: 'guestBooks',
      component: GuestBookListView
    }
    


  ]
})

export default router
