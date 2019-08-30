import Vue from 'vue'
import App from './App.vue'
import babylon from 'vue-babylonjs'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(babylon)

new Vue({
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
