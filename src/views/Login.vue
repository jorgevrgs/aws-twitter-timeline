<template>
  <main data-test="authentication-form">
    <amplify-authenticator>
      <div v-if="currentUser">
        <div>Hello, {{ currentUser.username }}</div>
      </div>
    </amplify-authenticator>
  </main>
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
    ...mapGetters(["currentUser", "me"]),
  },
};
</script>
