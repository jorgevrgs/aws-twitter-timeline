<template>
  <amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <div>Hello, {{ user.username }}</div>
    </div>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { mapGetters } from "vuex";
import { API } from "aws-amplify";

export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.$store.commit("SET_AUTH_STATE", authState);
      this.$store.commit("SET_AUTH_DATA", authData);

      this.user = authData;
    });
  },
  data() {
    return {
      user: undefined,
      unsubscribeAuth: undefined,
    };
  },
  computed: {
    ...mapGetters(["authState", "authData", "me"]),
  },
  mounted() {
    // what
    API.get("usersApi", "/users/1", {}).then(console.log).catch(console.error);
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
};
</script>
