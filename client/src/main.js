import Vue from 'vue'
import Router from 'vue-router'
import app from './app'
import router from './infrastructure/router'
import "./infrastructure/filters"

Vue.config.productionTip = false

Vue.use(Router)

new Vue({
  render: h => h(app),
  router
}).$mount('#app')
