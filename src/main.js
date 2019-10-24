import Vue from 'vue'
import Router from 'vue-router'
import app from './app'
import budget from './components/budget'
import budgetList from './components/budgetList'
import login from './components/login'
import register from './components/register'
import "./filters"

Vue.config.productionTip = false

Vue.use(Router)

var router = new Router({
  routes: [
    { name: 'login', path: '/', component: login },
    { name: 'register', path: '/register', component: register },
    { name: 'budget-list', path: '/budgets', component: budgetList },
    { name:'budget', path: '/budget/:id', component: budget }
  ]
})

new Vue({
  render: h => h(app),
  router
}).$mount('#app')
