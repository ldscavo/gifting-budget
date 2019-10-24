import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Budget from './components/Budget'
import BudgetList from './components/BudgetList'
import Login from './components/Login'
import register from './components/register'
import "./filters"

Vue.config.productionTip = false

Vue.use(Router)

var router = new Router({
  routes: [
    { name: 'login', path: '/', component: Login },
    { name: 'register', path: '/register', component: register },
    { name: 'budget-list', path: '/budgets', component: BudgetList },
    { name:'budget', path: '/budget/:id', component: Budget }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
