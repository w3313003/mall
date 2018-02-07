/*
 * @Author: ZhaoJie 
 * @Date: 2017-11-09 9:10:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-07 15:07:28
 */
import Vue from 'vue'
import App from './App'
import { router } from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import vConsole from 'vconsole'
import Croppa from 'vue-croppa'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(Croppa)       
Vue.use(VueQuillEditor)


// new vConsole()
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('common/image/fff.png')
})


Vue.prototype.axios = axios.create({
    timeout: 10000,
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store,
});

