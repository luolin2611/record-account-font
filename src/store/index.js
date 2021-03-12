import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
export default new vuex.Store({
  state: {
    showLoading: false,
    user: null,
  },
  getters: {
    getShowLoading (state) {
      return state.showLoading
    },
    getUser(state) {
      let user = null;
      if(state.user) {
        user = state.user;
      } else {
        user = JSON.parse(localStorage.getItem('user'));
        state.user = user;
      }
      return user
    }
  },
  mutations: {
    setShowLoading (state, load) {
      state.showLoading = load
    },
    setUser(state, user) {
      if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user
      } else {
        localStorage.removeItem('user');
        state.user = null;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
