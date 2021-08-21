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
    createUser({ commit }, data) {
      API.post("usersApi", "/users", { body: data })
        .then((user) => {
          console.log("createUser", user);

          commit("SET_USER", user);
        })
        .catch("createUser", console.error);
    },

    readUser({ commit }, data) {
      API.get("usersApi", "/users/object/" + data)
        .then((user) => {
          console.log("readUser", user);

          commit("SET_USER", user);
        })
        .catch(console.error);
    },

    updateUser({ commit }, { id, ...data }) {
      API.put("usersApi", "/users/" + id, data)
        .then((user) => {
          console.log("readUser", user);

          commit("SET_USER", user);
        })
        .catch(console.error);
    },

    deleteUser({ commit }, { id }) {
      API.delete("usersApi", "/users/" + id)
        .then((user) => {
          console.log("readUser", user);

          commit("SET_USER", user);
        })
        .catch(console.error);
    },
  },
  modules: {},
});
