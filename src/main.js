import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './lang';

/* Vue Axios */
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueAxios, axios);
/* End Vue Axios */

/* Vue Notificaitons  */
import VueNotifications from 'vue-notifications';
import iziToast from 'izitoast';
Vue.use(VueNotifications, iziToast);
/* End Vue Notificaitons  */

/* Axios PLugin */
import AxiosPlugin from 'vue-axios-cors';
Vue.use(AxiosPlugin)
/* End Axios PLugin */


// baseURL
window.baseURL = 'http://ebayapi.mazadak.net/v1';
Vue.config.productionTip = false


new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
