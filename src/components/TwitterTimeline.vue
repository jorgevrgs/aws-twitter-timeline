<template>
  <section id="timeline" v-if="user">
    <div v-for="item in items" :key="item.id" class="item">
      <div class="userinfo">
        <div class="image">
          <a :href="userLink" target="_blank">
            <img :src="user['profile_image_url']" alt="" />
          </a>
        </div>
        <div class="user">
          <div class="name">
            <a :href="userLink" target="_blank">{{ user.name }}</a>
          </div>
          <div class="username">@{{ user.username }}</div>
        </div>
      </div>

      <div class="text">
        <a
          :href="userLink + '/status/' + item.id"
          class="message-link"
          target="_blank"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TwitterTimeline",
  props: {
    items: {
      type: Array,
      default: () => [],
    },

    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    userLink() {
      return "https://twitter.com/" + this.user.username;
    },
  },
};
</script>

<style lang="scss">
#timeline {
  display: flex;
  flex-direction: column;

  .item {
    display: flex;
    flex-direction: column;
    justify-items: center;
    margin-block-end: 2rem;
    gap: 1rem;
    border-block-end: 1px solid #eee;
    padding-block-end: 1rem;

    .userinfo {
      display: flex;
      gap: 1rem;

      .image {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .text {
      text-align: left;
      text-decoration: none;

      .message-link {
        text-decoration: none;
      }
    }
  }
}
</style>
