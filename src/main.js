// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import element-ui and the attachments
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import router from './router'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import VueResource from 'vue-resource'

import App from './App'

Vue.config.productionTip = false

// global registered
Vue.component('NavBar', NavBar)
Vue.component('Footer', Footer)
Vue.use(ElementUI, {locale})
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
