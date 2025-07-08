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
    const teachers = ref([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.Id;

    const getAllTeachers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/teachers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        teachers.value = response.data;
        const teacher = teachers.value.find((t) => t.userId === Number(userId));
        localStorage.setItem("teacher", JSON.stringify(teacher));
      } catch (error) {
        console.error("O‘qituvchilarni olishda xatolik:", error);
      }
    };

    onMounted(() => {
      getAllTeachers();
    });

    return {
      layout: computed(() => route.meta.layout),
    };
  },
};
</script>
