import * as types from './mutation-types.js'

const mutations = {
    [types.SET_CURRENT_GOOD](state, payload) {
        state.current_good = payload;
    },
    [types.SET_GOODDETAIL_SHOW](state, payload) {
        state.good_detailshow = payload
    },
    [types.ADD_SHOPCART](state, payload) {
        state.shopcartList.push(payload)
    }
}

export default mutations;