<template>
  <nav-bar :is-authenticated="isAuthenticated" />

  <section v-if="isLoading">
    <loading-spinner v-if="isLoading" :is-loading="true" />
  </section>
  <router-view v-else v-slot="{ Component }">
    <transition>
      <!-- <keep-alive> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
    </transition>
  </router-view>
</template>

<script>
import { mapGetters } from "vuex";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "aws-amplify";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "AppLayout",
  components: { LoadingSpinner, NavBar },
  data() {
    return {
      isLoading: false,
      unsubscribeAuth: undefined,
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated", "me"]),
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange(async (authState, authData) => {
      this.isLoading = true;

      if (authState === "signedin" && authData) {
        // Logged in
        const currentUser = await Auth.currentUserInfo();
        this.$store.dispatch("readUser", currentUser.id);
        this.$store.commit("SET_CURRENT_USER", currentUser);
      } else {
        // Logged out
        this.$store.commit("SET_CURRENT_USER", undefined);
      }

      this.isLoading = false;

      if (this.isAuthenticated) {
        this.$router.push({ name: "Profile" });
      } else {
        this.$router.push({ name: "Login" });
      }
    });
  },
  async mounted() {
    const currentUser = await Auth.currentUserInfo();

    if (currentUser) {
      this.$store.commit("SET_CURRENT_USER", currentUser);
    }
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
  watch: {
    async currentUser(currentUser) {
      this.isLoading = true;

      if (currentUser) {
        await this.$store.dispatch("readUser", currentUser.id);
      }

      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
