<template>
  <amplify-authenticator>
    <div v-if="authState === 'signedin' && authData">
      <div>Hello, {{ authData.username }}</div>
    </div>
  </amplify-authenticator>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: undefined,
    };
  },
  computed: {
    ...mapGetters(["authState", "authData", "me"]),
  },
};
</script>
