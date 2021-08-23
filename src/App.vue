<template>
  <div id="nav" v-cloak>
    <div class="home-link">
      <router-link to="/">Home</router-link>
    </div>

    <template v-if="isAuthenticated">
      <div class="profile-">
        <router-link :to="{ name: 'Profile' }">Profile</router-link>
      </div>
      <div class="signuot">
        <amplify-sign-out button-text="Sign Out"></amplify-sign-out>
      </div>
    </template>

    <div v-else class="login-link">
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>

  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { mapGetters } from "vuex";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

export default {
  data() {
    return {
      unsubscribeAuth: undefined,
    };
  },
  computed: {
    ...mapGetters([
      "authState",
      "authData",
      "isAuthenticated",
      "me",
      "twitter",
    ]),
  },
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange(async (authState, authData) => {
      if (authState === "signedin") {
        this.$store.dispatch("readUser", authData.attributes.sub);
      }

      this.$store.commit("SET_AUTH_STATE", authState);
      this.$store.commit("SET_AUTH_DATA", authData);

      if (this.isAuthenticated) {
        this.$router.push({ name: "Profile" });
      } else {
        this.$router.push({ name: "Login" });
      }
    });
  },
  beforeUnmount() {
    this.unsubscribeAuth();
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
