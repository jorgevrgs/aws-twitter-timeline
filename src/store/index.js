import { createStore } from "vuex";
import { API } from "aws-amplify";

export default createStore({
  state: {
    authState: undefined,
    authData: undefined,
    me: undefined,
    twitter: {
      user: undefined,
      twits: [],
    },
  },
  getters: {
    authState: (state) => state.authState,
    authData: (state) => state.authData,
    me: (state) => state.me,
    twitter: (state) => state.twitter,
    isAuthenticated: (state) =>
      state.authState === "signedin" && state.authData,
  },
  mutations: {
    SET_AUTH_STATE: (state, payload) => (state.authState = payload),
    SET_AUTH_DATA: (state, payload) => (state.authData = payload),
    SET_USER: (state, payload) => (state.me = payload),
    SET_TWITTER_USER: (state, payload) => (state.twitter.user = payload),
    SET_TWITTER_TWITS: (state, payload) => (state.twitter.twits = payload),
  },
  actions: {
    async readUser({ commit }, data) {
      try {
        const user = await API.get("usersApi", "/users/" + data);
        commit("SET_USER", user);
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser({ commit }, { id, ...data }) {
      try {
        await API.put("usersApi", "/users/" + id, { body: data });
        const user = await API.get("usersApi", "/users/" + data);
        commit("SET_USER", user);
      } catch (error) {
        console.error(error);
      }
    },

    async getIdByUsername({ commit }, data) {
      try {
        const response = await API.get(
          "timelineApi",
          "/twitter/username/" + data
        );

        commit("SET_TWITTER_USER", response);
      } catch (error) {
        console.error(error);
      }
    },

    async getTimelineById({ commit }, data) {
      try {
        const response = await API.get(
          "timelineApi",
          "/twitter/timeline/" + data
        );

        commit("SET_TWITTER_TWITS", response);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
