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
  mounted() {
    if (
      this.user &&
      typeof this.user.imageUrl !== "undefined" &&
      !this.user.imageUrl
    ) {
      this.avatar = "https://www.gravatar.com/avatar/";
      this.avatar += crypto
        .createHash("md5")
        .update(this.user.id)
        .digest("hex");

      this.avatar += "?s=200";
    } else {
      this.avatar = this.user.imageUrl;
    }
  },
};
</script>
