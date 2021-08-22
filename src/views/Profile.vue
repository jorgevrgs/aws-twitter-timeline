<template>
  <div id="profile">
    <main class="container">
      <nav class="edit-link">
        <router-link :to="{ name: 'EditProfile' }">Edit Profile</router-link>
      </nav>

      <div class="columns">
        <div class="left-column">
          <div v-if="me" class="avatar"><avatar-image :user="me" /></div>
          <div class="card">
            <div v-if="me" class="title">
              <span v-if="me.firstName">{{ me.firstName }}'s</span> Timeline
            </div>

            <loading-spinner v-if="isLoading" :is-loading="true" />

            <div class="timeline" v-if="!isLoading && user">
              <twitter-timeline :items="items" :user="user"></twitter-timeline>

              <a :href="'https://twitter.com/' + user.username" target="_blank"
                >Go to Account</a
              >
            </div>
          </div>
        </div>

        <div class="right-column">
          <div v-if="me && me.firstName && me.lastName" class="fullName">
            <div class="firstName">{{ me.firstName }}</div>
            <div class="lastName">{{ me.lastName }}</div>
          </div>
          <div class="card summary">
            <div class="title">My Work Experience</div>
            <div v-if="me && me.workExperience" class="content">
              {{ me.workExperience }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TwitterTimeline from "../components/TwitterTimeline.vue";
import AvatarImage from "../components/AvatarImage.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["me", "twitter"]),
    user() {
      return this.twitter?.user;
    },
    items() {
      return this.twitter?.twits;
    },
  },
  components: {
    TwitterTimeline,
    AvatarImage,
    LoadingSpinner,
  },
  methods: {
    async loadTwits() {
      this.isLoading = true;

      await this.$store.dispatch("getIdByUsername", this.me.twitterUsername);
      const userId = this.twitter?.user?.id;
      await this.$store.dispatch("getTimelineById", userId);

      this.isLoading = false;
    },
  },
  async mounted() {
    if (this.me?.twitterUsername) {
      this.loadTwits();
    }
  },
  watch: {
    me(val) {
      if (val) {
        this.loadTwits();
      }
    },
  },
};
</script>

<style lang="scss">
#profile {
  display: flex;
  justify-content: center;
  background-color: #eee;

  .container {
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    padding: 2rem;
    gap: 1rem;

    .edit-link {
      display: flex;
      justify-content: flex-end;
    }

    .card {
      background-color: #fff;
      border-radius: 1rem;
      padding-block: 1rem;
      padding-inline: 1rem;

      .title {
        border-block-end: 1px solid #aaa;
        padding-block-end: 1rem;
        margin-block-end: 2rem;
        font-size: 1.5rem;
      }
    }

    .columns {
      display: flex;
      gap: 1rem;

      .left-column {
        flex-direction: column;
        width: 50%;

        .avatar {
          margin-block-end: 3rem;
        }
      }

      .right-column {
        flex-direction: column;
        width: 50%;

        .fullName {
          display: flex;
          flex-direction: row;
          justify-content: center;
          font-size: 3rem;
          font-weight: 700;
          margin-block-end: 3rem;

          .lastName {
            margin-inline-start: 1rem;
          }
        }

        .summary {
          .content {
            text-align: justify;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}
</style>
