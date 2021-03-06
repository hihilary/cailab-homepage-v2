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
import Alumni from '@/components/Alumni'
import VueResource from 'vue-resource'
import LoginDialog from '@/components/LoginDialog'
import VueLazyload from 'vue-lazyload'
import device from 'current-device'

import App from './App'

Vue.config.productionTip = false

if (device.mobile()) {
  window.location = 'https://m.cailab.org'
}

// global registered
Vue.component('NavBar', NavBar)
Vue.component('Footer', Footer)
Vue.component('Alumni', Alumni)
Vue.component('LoginDialog', LoginDialog)
Vue.use(ElementUI, {locale})
Vue.use(VueResource)
Vue.use(VueLazyload, {lazyComponent: true})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
