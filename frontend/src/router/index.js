import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
// import News from '@/components/News'
import Publications from '@/components/Publications'
import People from '@/components/People'
import Contact from '@/components/Contact'
// import PublicationEdit from '@/components/PublicationEdit'
import Collaborators from '@/components/Collaborators'
import OpenPositions from '@/components/OpenPositions'
import Lab from '@/components/Lab'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    // {
    //   path: '/news_items',
    //   name: 'News',
    //   component: News
    // },
    {
      path: '/publications',
      name: 'Publications',
      component: Publications
    },
    // {
    //   path: '/publication_edit',
    //   name: 'PublicationEdit',
    //   component: PublicationEdit
    // },
    {
      path: '/users',
      name: 'People',
      component: People
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/collaborators',
      name: 'Collaborators',
      component: Collaborators
    },
    {
      path: '/openpositions',
      name: 'OpenPositions',
      component: OpenPositions
    },
    {
      path: '/pictures',
      name: 'Lab',
      component: Lab
    }
  ]
})
