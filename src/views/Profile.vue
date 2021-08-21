<template>
  <div id="profile">
    <main class="container">
      <div class="left-column">
        <div class="avatar"><img :src="avatar" /></div>
        <div class="card timeline">
          <div class="title">John's Timeline</div>

          <!-- Twitter Timeline Component Here -->
        </div>
      </div>
      <div class="right-column">
        <div class="fullName">
          <div class="firstName">John</div>
          <div class="lastName">Doe</div>
        </div>
        <div class="card summary">
          <div class="title">My Work Experience</div>
          <div class="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga cumque ex nesciunt facere assumenda. Aut ipsa, quas, quidem
            quaerat repellendus eum odio repellat quis harum eveniet tempore,
            cumque omnis?
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import crypto from "crypto";

export default {
  data() {
    return {
      avatar: "",
    };
  },
  mounted() {
    this.avatar = "https://www.gravatar.com/avatar/";
    this.avatar += crypto.createHash("md5").update("abc").digest("hex");
    this.avatar += "?s=200";
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
    max-width: 1024px;
    padding: 2rem;
    gap: 1rem;

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
        }
      }
    }
  }
}
</style>
