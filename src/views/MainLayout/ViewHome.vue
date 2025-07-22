<template>
  <div class="max-w-6xl mx-auto p-6">
    <div v-if="loading" class="text-center text-gray-500 mt-10">Yuklanmoqda...</div>

    <template v-else>
      <h1 v-if="teacher" class="text-3xl font-bold text-gray-800 mb-6">
        👨‍🏫 Salom {{ teacher.user.firstname }}
      </h1>

      <div v-if="teacher" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            👤 Shaxsiy ma'lumotlar
          </h2>
          <ul class="text-gray-600 space-y-1 text-sm">
            <li><strong>Ism:</strong> {{ teacher.user.firstname }}</li>
            <li><strong>Familiya:</strong> {{ teacher.user.lastname }}</li>
            <li><strong>Telefon:</strong> {{ teacher.user.phoneNumber }}</li>
          </ul>
        </div>

        <div class="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            🛠️ Ko'nikmalar
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in teacher.skills"
              :key="index"
              class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            📚 Kurs
          </h2>
          <ul class="text-gray-600 space-y-1 text-sm">
            <li><strong>Kurs nomi:</strong> {{ teacher.course.name }}</li>
            <li><strong>Kurs ID:</strong> {{ teacher.courseId }}</li>
          </ul>
        </div>

        <div class="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            👥 Guruhlar
          </h2>
          <ul class="text-gray-600 text-sm space-y-2">
            <li
              v-for="group in teacher.groups"
              :key="group.id"
              class="border border-gray-100 bg-gray-50 px-4 py-2 rounded-md"
            >
              <p><strong>Nomi:</strong> {{ group.name }}</p>
              <p><strong>ID:</strong> {{ group.id }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="text-gray-500 text-center mt-10">Ma'lumot topilmadi</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from "../../axios/settings.js";

const teachers = ref([]);
const teacher = ref(null);
const loading = ref(true);
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
    const foundTeacher = teachers.value.find((t) => t.userId === Number(userId));
    teacher.value = foundTeacher || null;
    localStorage.setItem("teacher", JSON.stringify(foundTeacher));
  } catch (error) {
    console.error("O‘qituvchilarni olishda xatolik:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(getAllTeachers);
</script>
