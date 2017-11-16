import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Software from '@/components/Software'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/software',
      name: 'Software',
      component: Software
    }
  ]
})
