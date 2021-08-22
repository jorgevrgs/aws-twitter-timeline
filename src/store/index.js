import { createStore } from "vuex";
import { API } from "aws-amplify";

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
    isAuthenticated: (state) =>
      state.authState === "signedin" && state.authData,
  },
  mutations: {
    SET_AUTH_STATE: (state, payload) => (state.authState = payload),
    SET_AUTH_DATA: (state, payload) => (state.authData = payload),
    SET_USER: (state, payload) => (state.me = payload),
  },
  actions: {
    readUser({ commit }, data) {
      API.get("usersApi", "/users/" + data)
        .then((user) => {
          console.log("readUser", user);

          commit("SET_USER", user);
        })
        .catch(console.error);
    },

    updateUser({ commit }, { id, ...data }) {
      API.put("usersApi", "/users/" + id, { body: data })
        .then((user) => {
          console.log("updateUser", user);

          commit("SET_USER", user);
        })
        .catch(console.error);
    },
  },
  modules: {},
});
