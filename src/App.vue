<template>
  <component :is="layout + '-layout'"></component>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "./axios/settings.js";

export default {
  components: {
    MainLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute();
    

    return {
      layout: computed(() => route.meta.layout),
    };
  },
};
</script>
