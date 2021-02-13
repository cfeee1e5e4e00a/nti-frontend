import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Me from '../views/Me.vue'
import Schedule from '../views/Schedule.vue'
import Stash from '../views/Stash.vue'
import Stream from '../views/Stream.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import RestorePassword from '../views/RestorePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    alias: '*',
    component: { render: (h) => h('div', ['page not found! :(']) } 
  },
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
    path: '/me/:username',
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
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/restore',
    name: 'RestorePassword',
    component: RestorePassword
  }
]

const router = new VueRouter({
  routes
})

export default router
