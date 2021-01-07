import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
	
    // Home
    { path: '/', name: 'home', component: require('../components/home/List.vue').default },

    // 404 Not found
    { path: '/*', name: 'not-found', component: require('../components/common/404.vue').default }

  ]
})
