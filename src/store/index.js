import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codeList:[1,2]
  },
  mutations: {
    setCodeList(state,codeList){
      state.codeList=codeList
    }
  },
  actions: {
  },
  modules: {
  }
})
