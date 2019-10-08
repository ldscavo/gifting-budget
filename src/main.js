import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Budget from './components/Budget'
import Login from './components/Login'
import "./filters"

Vue.config.productionTip = false

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/', component: Login },
    { path: '/budget/:id', component: Budget }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
