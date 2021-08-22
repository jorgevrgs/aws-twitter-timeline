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
            <div class="timeline">
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
        {
          id: "1428812144355815427",
          text: "@_nasch_ Configuré Prettier; así que yo no tengo la culpa 😂",
        },
        {
          id: "1422515493404090394",
          text: "@lirrums Yooooo. Invicto o asintomático 🙄 😅",
        },
        {
          id: "1418552606604075009",
          text: "@ravinwashere Internet",
        },
        {
          id: "1415365347125780480",
          text: "An important date: getting COVID-19 vaccine today. #COVIDVaccination",
        },
        {
          id: "1407732963027062785",
          text: "RT @sails_conf: Sails is not dead, Sails is not dying and it’s going to be very hard to get rid of it - @mikermcneil\n\ncc @sailsjs\n\n#SC2021…",
        },
      ],
      user: {
        created_at: "2010-05-01T19:07:33.000Z",
        username: "jorgevrgs1",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1353464259771052032/-cCrxYaS_normal.jpg",
        protected: false,
        url: "https://t.co/qtdcTR9nVE",
        name: "Jorge Vargas",
        id: "139164117",
        location: "Sogamoso, Colombia",
        verified: false,
        description:
          "Web developer Node.js (Express, Fastify, Sails), PHP, JavaScript, Vue, Nuxt. Looking for a remote, entry-level and full-time job.",
        entities: {
          url: {
            urls: [
              {
                start: 0,
                end: 23,
                url: "https://t.co/qtdcTR9nVE",
                expanded_url: "http://www.biomedicos.co",
                display_url: "biomedicos.co",
              },
            ],
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["me"]),
  },
  components: {
    TwitterTimeline,
    AvatarImage,
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
