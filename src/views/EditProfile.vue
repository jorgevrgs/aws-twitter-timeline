<template>
  <main id="edit-profile">
    <div class="container">
      <h1>Edit Profile</h1>

      <form class="form" @submit.prevent="onSubmit()">
        <div class="form-group">
          <label class="label" for="firstName">First Name</label>
          <input
            class="input"
            type="text"
            id="firstName"
            v-model.trim="formData.firstName"
            placeholder="John"
          />
        </div>

        <div class="form-group">
          <label class="label" for="lastName">Last Name</label>
          <input
            class="input"
            type="text"
            id="lastName"
            v-model.trim="formData.lastName"
            placeholder="Doe"
          />
        </div>

        <div class="form-group">
          <label class="label" for="twitterUsername">Twitter Username</label>
          <input
            class="input"
            type="text"
            id="twitterUsername"
            v-model.trim="formData.twitterUsername"
            placeholder="@twitter"
          />
        </div>

        <div class="form-group">
          <label class="label" for="workExperience">Work Experience</label>
          <textarea
            class="textarea"
            name="workExperience"
            id="workExperience"
            v-model.trim="formData.workExperience"
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div class="button">
          <input
            class="cancel"
            type="button"
            @click="onCancel()"
            value="Cancel"
          />

          <button class="submit" type="submit">Update</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        twitterUsername: "",
        workExperience: "",
        firstName: "",
        lastName: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.formData);

      this.$router.push({ name: "Profile" });
    },

    onCancel() {
      this.$router.push({ name: "Profile" });
    },
  },
};
</script>

<style lang="scss">
#edit-profile {
  display: flex;
  justify-content: center;
  background-color: #eee;

  .container {
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    padding: 2rem;

    .form {
      width: 100%;

      .form-group {
        width: 800px;
        display: flex;
        flex-direction: column;
        margin-block-end: 2rem;

        .label {
          align-self: flex-start;
          margin-block-end: 0.5rem;
          font-weight: 500;
        }

        .input {
          padding-inline: 1rem;
          padding-block: 1rem;
          border-radius: 5px;
          border: none;
        }

        .textarea {
          resize: vertical;
          border-radius: 5px;
          border: none;
        }
      }

      .button {
        display: flex;
        justify-content: flex-end;
        gap: 2rem;

        .cancel {
          background-color: var(--amplify-light-grey);
          color: var(--amplify-primary-contrast);
          border: none;
          padding-block: 1rem;
          padding-inline: 2rem;
          font-size: var(--amplify-text-md);
          cursor: pointer;
        }

        .submit {
          background-color: var(--amplify-primary-color);
          color: var(--amplify-primary-contrast);
          border: none;
          padding-block: 1rem;
          padding-inline: 2rem;
          font-size: var(--amplify-text-md);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
