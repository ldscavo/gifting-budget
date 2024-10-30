import Vue from 'vue'
import Router from 'vue-router'
import app from './app'
import router from './infrastructure/router'
import "./infrastructure/filters"

import { VueSpinners } from '@saeris/vue-spinners'
import Fragment from 'vue-fragment'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEdit,
  faChevronRight,
  faChevronDown,
  faTrash,
  faEllipsisV,
  faBan,
  faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faChevronRight, faChevronDown, faTrash, faEllipsisV, faBan, faCheck);

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(VueSpinners);
Vue.use(Fragment.Plugin)
Vue.component('fa-icon', FontAwesomeIcon);

new Vue({
  render: h => h(app),
  router
}).$mount('#app');
