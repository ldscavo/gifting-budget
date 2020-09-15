import Vue from 'vue'
import Router from 'vue-router'
import app from './app'
import router from './infrastructure/router'
import "./infrastructure/filters"

import { VueSpinners } from '@saeris/vue-spinners'

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VueSpinners)

new Vue({
  render: h => h(app),
  router
}).$mount('#app')
