import Router from 'vue-router'
import budget from '../components/budget.vue'
import budgetList from '../components/budgetList.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'

var router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'register',
      path: '/register',
      component: register
    },
    {
      name: 'budget-list',
      path: '/budgets',
      alias: '/',
      component: budgetList,
      meta: {
        requireAuth: true
      }
    },
    {
      name: 'budget',
      path: '/budget/:id',
      component: budget,
      meta: {
        requireAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) =>
  to.matched.some(record => record.meta.requireAuth)
    ? (localStorage.getItem('token'))
      ? next()
      : next('/login')
    : next());

export default router;