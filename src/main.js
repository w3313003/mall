/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-09 9:10:21 
 * @Last Modified by:   赵杰 
 * @Last Modified time: 2017-11-24 10:10:31 
 */
import Vue from 'vue'
import App from './App'
import { router } from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('common/image/default.png')
})


Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store
})