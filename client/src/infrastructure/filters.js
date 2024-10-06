import Vue from 'vue'

let currency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

let date = (value) =>
  new Date(value).toLocaleDateString('en-US');

Vue.filter('currency', currency);
Vue.filter('date', date);