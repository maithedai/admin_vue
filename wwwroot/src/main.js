// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import css
import "./assets/styles/base/index.css";

// import bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// import element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from '@/assets/lang/vi';
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// mixins
import mixins from "@/mixins/index";
Vue.mixin(mixins)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import { VuejsDatatableFactory } from 'vuejs-datatable';
Vue.use(VuejsDatatableFactory);

// plugins
import Confirm from "@/plugins/confirm/index.js";
Vue.use(Confirm);
import PopupLoading from "@/plugins/popupLoading/index.js";
Vue.use(PopupLoading);

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// event bus
Vue.prototype.$eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
