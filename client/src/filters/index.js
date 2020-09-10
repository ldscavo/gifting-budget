import Vue from 'vue'

Vue.filter('currency', value => value.toLocaleString('en-US', { style: 'currency', currency: 'USD'}))