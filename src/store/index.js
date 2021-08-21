import { createStore } from "vuex";

export default createStore({
  state: {
    authState: undefined,
    authData: undefined,
    me: undefined,
  },
  getters: {
    authState: (state) => state.authState,
    authData: (state) => state.authData,
    me: (state) => state.me,
  },
  mutations: {
    SET_AUTH_STATE: (state, payload) => (state.authState = payload),
    SET_AUTH_DATA: (state, payload) => (state.authData = payload),
    SET_USER: (state, payload) => (state.me = payload),
  },
  actions: {},
  modules: {},
});
