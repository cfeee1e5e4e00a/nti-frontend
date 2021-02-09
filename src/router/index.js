import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Me from '../views/Me.vue'
import Schedule from '../views/Schedule.vue'
import Stash from '../views/Stash.vue'
import Stream from '../views/Stream.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/stash',
    name: 'Stash',
    component: Stash
  },
  {
    path: '/stream',
    name: 'Stream',
    component: Stream
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
