import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Software from '@/components/Software'
import News from '@/components/News'
import Publications from '@/components/Publications'
import People from '@/components/People'
import Contact from '@/components/Contact'
import PublicationEdit from '@/components/PublicationEdit'
import Collaborators from '@/components/Collaborators'
import NewsEdit from '@/components/NewsEdit'
import OpenPositions from '@/components/OpenPositions'

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
    },
    {
      path: '/news_items',
      name: 'News',
      component: News
    },
    {
      path: '/publications',
      name: 'Publications',
      component: Publications
    },
    {
      path: '/publication_edit',
      name: 'PublicationEdit',
      component: PublicationEdit
    },
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
      path: '/news_edit',
      name: 'NewsEdit',
      component: NewsEdit
    },
    {
      path: '/openpositions',
      name: 'OpenPositions',
      component: OpenPositions
    }
  ]
})
