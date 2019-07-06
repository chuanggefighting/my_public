import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import XButton from "vux/src/components/x-button"
Vue.component('x-button', XButton)

import Validator from './assets/js/validator'
Vue.use(Validator)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
