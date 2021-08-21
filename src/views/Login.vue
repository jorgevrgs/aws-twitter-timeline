<template>
  <amplify-authenticator>
    <div v-if="authState === 'signedin' && authData">
      <div>Hello, {{ authData.username }}</div>
    </div>
  </amplify-authenticator>
</template>

<script>
import { mapGetters } from "vuex";
import { API } from "aws-amplify";

export default {
  data() {
    return {
      user: undefined,
    };
  },
  computed: {
    ...mapGetters(["authState", "authData", "me"]),
  },
  mounted() {
    // what
    API.get("usersApi", "/users/1", {}).then(console.log).catch(console.error);
  },
};
</script>
