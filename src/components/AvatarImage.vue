<template>
  <img lazy :src="avatar" width="200" height="200" alt="avatar" />
</template>

<script>
import crypto from "crypto";

export default {
  name: "AvatarImage",
  data() {
    return {
      avatar: "",
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getAvatar(str) {
      let avatar = "https://www.gravatar.com/avatar/";
      avatar += crypto.createHash("md5").update(str).digest("hex");

      avatar += "?s=200";

      return avatar;
    },
  },
  mounted() {
    if (this.user && this.user.id) {
      // User profile exists
      if (this.user.imageUrl) {
        // Image URL exists
        this.avatar = this.user.imageUrl;
      } else {
        // Empty image URL
        this.avatar = this.getAvatar(this.user.id);
      }
    } else {
      // User profile empty
      this.avatar = this.getAvatar(new Date());
    }
  },
};
</script>
