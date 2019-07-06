import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ACTIVE_ROUTE: "",
    LOADING: {
      status: 0,
      msg: ""
    },
    ORDER: [],
    CLAIM: {}
  },
  getters: {},
  mutations: {
    showLoad (state, obj){
      state.LOADING = obj
    },
    hideLoad (state){
      state.LOADING = { status: 0, msg: "" }
    },
    updateView(state, route){
      state.ACTIVE_ROUTE = route
    },
    checkedOrder(state, list){
      state.ORDER = list
    },
    checkedClaim(state, claim){
      state.CLAIM = claim
    },
  },
  actions: {
    // viewEntrance: ({ commit }, id) => commit('viewEntrance', id)
  }
});


