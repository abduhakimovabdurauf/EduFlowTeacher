<template>
  <div class="mx-auto px-4 py-10">
    <h2 class="text-3xl font-semibold text-gray-800 mb-8">Guruh haqida</h2>

    <div class="bg-white rounded-xl p-6 shadow-md border mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p class="text-gray-500 text-sm">Nomi</p>
          <p class="font-medium text-lg">{{ group.name }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Kurs</p>
          <p class="font-medium text-lg">{{ group.course.name }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Narxi</p>
          <p class="font-medium text-lg">{{ group.course.price }} so'm</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Muddat</p>
          <p class="font-medium text-lg">{{ group.course.term }} oy</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">O'qituvchi</p>
          <p class="font-medium text-lg">{{ group.teacher.user.firstname }} {{ group.teacher.user.lastname }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Holati</p>
          <span
            :class="[
              'inline-block px-2 py-1 rounded-full text-xs font-semibold',
              group.isStatus === 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            ]"
          >
            {{ group.isStatus === 0 ? 'Aktiv' : 'Arxivlangan' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Darslar bo'limi -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">Darslar</h2>
      <button
        @click="openSidebarForNewLesson"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      >
        + Dars qo‘shish
      </button>
    </div>

    <div class="overflow-x-auto bg-white border rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th class="px-6 py-3 text-left">#</th>
            <th class="px-6 py-3 text-left">Dars nomi</th>
            <th class="px-6 py-3 text-left">Sana</th>
            <th class="px-6 py-3 text-left">Tartib raqami</th>
            <th class="px-6 py-3 text-left">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-3">{{ index + 1 }}</td>
            <td class="px-6 py-3">{{ lesson.name }}</td>
            <td class="px-6 py-3">{{ new Date(lesson.date).toLocaleDateString('uz-UZ') }}</td>
            <td class="px-6 py-3">{{ lesson.lessonNumber }}</td>
            <td class="px-6 py-3 space-x-2">
              <button @click="editLesson(lesson)" class="text-yellow-500 hover:underline">Tahrirlash</button>
              <button @click="deleteLesson(lesson.id)" class="text-red-500 hover:underline">O‘chirish</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <LessonSidebar
      :show="sidebarOpen"
      :lesson="selectedLesson"
      :group-id="group.id"
      @close="sidebarOpen = false"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import LessonSidebar from '../../components/LessonSidebar.vue';

export default {
  components: { LessonSidebar },
  setup() {
    const store = useStore();
    const route = useRoute();

    const group = ref({ course: {}, teacher: { user: {} } });
    const lessons = ref([]);
    const sidebarOpen = ref(false);
    const selectedLesson = ref(null);

    const fetchGroupAndLessons = async () => {
      const id = route.params.id;
      group.value = await store.dispatch('group/getGroupById', id);
      await store.dispatch('lesson/getLessonsByGroup', id);
      lessons.value = store.getters['lesson/lessons'];
    };

    const openSidebarForNewLesson = () => {
      selectedLesson.value = null;
      sidebarOpen.value = true;
    };

    const editLesson = (lesson) => {
      selectedLesson.value = lesson;
      sidebarOpen.value = true;
    };

    const deleteLesson = async (id) => {
      await store.dispatch('lesson/deleteLesson', id);
      await fetchGroupAndLessons();
    };

    onMounted(fetchGroupAndLessons);

    return {
      group,
      lessons,
      sidebarOpen,
      selectedLesson,
      openSidebarForNewLesson,
      editLesson,
      deleteLesson,
    };
  },
};
</script>

<style scoped>
</style>