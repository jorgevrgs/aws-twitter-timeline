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

    <div v-else class="login-link" data-test="nav-bar-login-link">
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
