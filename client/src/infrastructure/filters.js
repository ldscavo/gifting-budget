import Vue from 'vue'

let currency = value =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

Vue.filter('currency', currency)