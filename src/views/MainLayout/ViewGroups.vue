<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
      Guruhlar ro‘yxati
    </h2>

    <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200 block lg:hidden">
      <table class="min-w-full text-xs sm:text-sm text-gray-700 divide-y divide-gray-100">
        <thead class="bg-gray-800 text-white text-[10px] sm:text-xs uppercase font-semibold">
          <tr>
            <th class="px-2 py-2 text-left">#</th>
            <th class="px-2 py-2 text-left">Nomi</th>
            <th class="px-2 py-2 text-left">O'qituvchi</th>
            <th class="px-2 py-2 text-left hidden md:table-cell">Kurs</th>
            <th class="px-2 py-2 text-left hidden sm:table-cell">Boshlangan sana</th>
            <th class="px-2 py-2 text-left">Holati</th>
            <th class="px-2 py-2 text-left">Amallar</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(group, index) in groups"
            :key="group.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-2 py-2 text-gray-500">{{ index + 1 }}</td>
            <td class="px-2 py-2 font-medium text-gray-900">{{ group.name }}</td>
            <td class="px-2 py-2">{{ getTeacherFullName(group.teacher.userId) }}</td>
            <td class="px-2 py-2 hidden md:table-cell">{{ group.course.name }}</td>
            <td class="px-2 py-2 hidden sm:table-cell">
              {{ group.createdAt }}
            </td>
            <td class="px-2 py-2">
              {{ group.status === 0 ? "Active" : "Inactive" }}
            </td>
            <td class="px-2 py-2">
              <div class="flex gap-1">
                <button
                  @click="viewGroup(group)"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-base px-1 py-[2px] rounded"
                >
                  <i class='bx bxs-eye-alt'></i>
                </button>
                <button
                  @click="editGroup(group)"
                  class="bg-green-500 hover:bg-green-600 text-white text-base px-1 py-[2px] rounded"
                >
                  <i class='bx bxs-edit-alt'></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Desktop uchun -->
    <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200 hidden lg:block">
      <table class="min-w-full text-sm sm:text-base text-gray-700 divide-y divide-gray-100">
        <thead class="bg-gray-800 text-white text-xs sm:text-sm uppercase font-semibold">
          <tr>
            <th class="px-4 py-3 text-left">#</th>
            <th class="px-4 py-3 text-left">Nomi</th>
            <th class="px-4 py-3 text-left">Kurs</th>
            <th class="px-4 py-3 text-left">O‘qituvchi</th>
            <th class="px-4 py-3 text-left">O‘quvchilar</th>
            <th class="px-4 py-3 text-left">Holati</th>
            <th class="px-4 py-3 text-left">Boshlangan sana</th>
            <th class="px-4 py-3 text-left">Amallar</th>
          </tr>
        </thead>
        <tbody v-if="groups && groups.length !== 0" class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(group, index) in groups"
            :key="group.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 text-gray-500">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ group.name }}</td>
            <td class="px-4 py-3">{{ group.course?.name }}</td>
            <td class="px-4 py-3">{{ getTeacherFullName(group.teacher.userId) }}</td>
            <td class="px-4 py-3">{{ group.students?.length }} ta</td>
            <td class="px-4 py-3">
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
            </td>
            <td class="px-4 py-3">
              {{ new Date(group.createdAt).toLocaleDateString('uz-UZ') }}
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  @click="viewGroup(group)"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-md sm:text-xl px-3 py-2 rounded-md"
                >
                  <i class='bx bxs-eye-alt'></i>
                </button>
                <button
                  @click="editGroup(group)"
                  class="bg-green-500 hover:bg-green-600 text-white text-md sm:text-xl px-3 py-2 rounded-md"
                >
                  <i class='bx bxs-edit-alt'></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="text-center py-6 text-gray-500 font-semibold">
              Sizning guruhlaringiz yo‘q!
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sidebar Modal -->
    <div
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      v-show="isSidebarOpen"
      @click.self="closeSidebar"
    >
      <transition name="sidebar-slide">
        <div
          v-show="isSidebarOpen"
          class="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out"
        >
          <h3 class="text-lg sm:text-xl font-semibold mb-5">Guruhni tahrirlash</h3>
          <form v-if="selectedGroup" @submit.prevent="saveChanges" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600">Nomi</label>
              <input v-model="selectedGroup.name" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600">O'qituvchi</label>
              <select
                v-model="selectedGroup.teacherId"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">O'qituvchi tanlang</option>
                <option
                  v-for="teacher in teachers"
                  :key="teacher.id"
                  :value="teacher.id"
                >
                  {{ teacher.user.firstname }} {{ teacher.user.lastname }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-600">Kurs</label>
              <input v-model="selectedGroup.course.name" type="text" readonly class="w-full border border-gray-300 rounded px-3 py-2 outline-none" />
            </div>
            <div>
              <label class="block text-sm text-gray-600">Holat</label>
              <select v-model="selectedGroup.isStatus" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option :value="0">Aktiv</option>
                <option :value="1">Arxivlangan</option>
              </select>
            </div>

            <div class="flex justify-end gap-2 pt-4">
              <button type="button" @click="closeSidebar" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                  Bekor qilish
              </button>
              <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>



<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
import axios from "../../axios/settings";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const groups = computed(() => store.getters['group/groups']);
    const selectedGroup = ref(null);
    const isSidebarOpen = ref(false);
    const teachers = ref([]);

    const viewGroup = (group) => {
      router.push(`/groups/${group.id}`);
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
      selectedGroup.value = null;
    };

    const getAllTeachers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/teachers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
          },
        });
        teachers.value = response.data;
      } catch (error) {
        console.error('O‘qituvchilarni olishda xatolik:', error);
      }
    };

    const editGroup = (group) => {
      selectedGroup.value = { ...group }; // clone qilish
      isSidebarOpen.value = true;
      getAllTeachers();
    };

    const getTeacherFullName = (userId) => {
      const teacher = teachers.value.find(
        (t) => t.userId === userId || t.user?.id === userId
      );
      if (teacher?.user) {
        return `${teacher.user.firstname} ${teacher.user.lastname}`;
      }
      return 'Nomaʼlum';
    };

    const saveChanges = async () => {
      if (!selectedGroup.value) return;

      const payload = {
        id: selectedGroup.value.id,
        name: selectedGroup.value.name,
        teacherId: selectedGroup.value.teacherId,
        courseId: selectedGroup.value.course?.id,
        isStatus: selectedGroup.value.isStatus,
      };

      try {
        await store.dispatch("group/updateGroup", payload);
        isSidebarOpen.value = false;
        selectedGroup.value = null;
        await store.dispatch("group/getAllGroups");
      } catch (error) {
        console.error("Saqlashda xatolik:", error);
      }
    };


    onMounted(() => {
      store.dispatch('group/getAllGroups');
      getAllTeachers();
    });

    return {
      groups,
      viewGroup,
      editGroup,
      selectedGroup,
      isSidebarOpen,
      closeSidebar,
      teachers,
      getTeacherFullName,
      saveChanges,
    };
  },
};
</script>



<style scoped>
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(100%);
}
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0%);
}
</style>
