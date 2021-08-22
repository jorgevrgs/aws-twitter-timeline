<template>
  <pulse-loader v-if="isLoading" />
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PulseLoader,
  },
};
</script>
