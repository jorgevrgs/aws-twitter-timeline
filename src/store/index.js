import { createStore } from "vuex";
import { API } from "aws-amplify";

export default createStore({
  state: {
    currentUser: undefined,
    me: undefined,
    twitter: {
      user: undefined,
      twits: [],
    },
  },
  getters: {
    currentUser: (state) => state.currentUser,
    me: (state) => state.me,
    twitter: (state) => state.twitter,
    isAuthenticated: (state) =>
      state.currentUser && typeof state.currentUser.id !== "undefined",
  },
  mutations: {
    SET_CURRENT_USER: (state, payload) => (state.currentUser = payload),
    SET_ME: (state, payload) => (state.me = payload),
    SET_TWITTER_USER: (state, payload) => (state.twitter.user = payload),
    SET_TWITTER_TWITS: (state, payload) => (state.twitter.twits = payload),
  },
  actions: {
    async readUser({ commit }, data) {
      try {
        const user = await API.get("usersApi", "/users/" + data);
        commit("SET_ME", user);
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser(_, { id, ...data }) {
      try {
        await API.put("usersApi", "/users/" + id, { body: data });
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
