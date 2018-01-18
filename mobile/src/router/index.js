import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Nav from '@/components/Nav'
import News from '@/components/News'
import Publications from '@/components/Publications'
import Projects from '@/components/Projects'
import People from '@/components/People'
import Lab from '@/components/Lab'
import Collaborators from '@/components/Collaborators'
import Contact from '@/components/Contact'
import OpenPositions from '@/components/OpenPositions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Nav,
    },
    {
      path: '/news_items',
      name: 'News',
      component: News,
    },
    {
      path: '/publications',
      name: 'Publications',
      component: Publications,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/users',
      name: 'People',
      component: People,
    },
    {
      path: '/lab',
      name: 'Lab',
      component: Lab,
    },
    {
      path: '/collaborators',
      name: 'Collaborators',
      component: Collaborators,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/collaborators',
      name: 'Collaborators',
      component: Collaborators,
    },
    {
      path: '/openpositions',
      name: 'OpenPositions',
      component: OpenPositions,
    },
  ]
})
