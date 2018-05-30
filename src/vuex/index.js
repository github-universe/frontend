import Vue from 'vue'
import Vuex from 'vuex'
import initialState from './initialState'

Vue.use(Vuex)
const store = new Vuex.Store({
  actions: {},
  mutations: {
    saveCitationDetail(state, e) {
      state.citationDetail = e
    },
    saveIpValueDetail(state, e) {
      state.ipValueDetail = e
    },
    clearIp(state) {
      state.ipValueDetail = []
      state.citationDetail = []
    },
    // saveStub(state, e) {
    //   state.ipDetail = e
    // },
    saveIp(state, e) {
      state.ipDetail = e
    },
    setMsg(state, e) {
      state.errorMsg = e
    },
    clearMsg(state) {
      state.errorMsg = ''
    },
    hideLoading(state) {
      state.showLoading = false
    },
    showLoading(state) {
      state.showLoading = true
    },
    saveNews(state, e) {
      state.news = e
      // e.imgs = [
      //   'https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026',
      //   'https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026',
      //   'https://p3.pstatp.com/list/190x124/85fe000c8fa514c6c026']
    },
    clearDetail(state) {
      state.news = undefined
    },
    clearList(state) {
      state.newsList = []
    },
    saveList(state, e) {
      const { news, pageNum, pageSize } = e
      state.newsList = state.newsList.concat(news)
      // state.pageNum = pageNum
      // state.pageSize = pageSize
    },
    changeLoginFlag(state, e) {
      state.isLogin = e
    },
    saveOpenId(state, e) {
      console.log(e)
      state.openId = e
    },
  },
  getters: {},
  state: initialState,
})
export default store
