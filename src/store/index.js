import Vue from 'vue'
import vuex from 'vuex'
// import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutation'
import createLogger from 'vuex/dist/logger'

Vue.use(vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new vuex.Store({
    // actions,
    state,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})