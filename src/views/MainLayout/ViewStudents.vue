<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
    <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
      O‘quvchilar ro‘yxati
    </h2>
    <!-- Mobil uchun -->
    <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200 block lg:hidden">
      <table class="min-w-full text-xs sm:text-sm text-gray-700 divide-y divide-gray-100">
        <thead class="bg-gray-800 text-white text-[10px] sm:text-xs uppercase font-semibold">
          <tr>
            <th class="px-2 py-2 text-left">#</th>
            <th class="px-2 py-2 text-left">F.I.Sh.</th>
            <th class="px-2 py-2 text-left">Yosh</th>
            <th class="px-2 py-2 text-left hidden md:table-cell">Manzil</th>
            <th class="px-2 py-2 text-left hidden sm:table-cell">Telefon</th>
            <th class="px-2 py-2 text-left">Guruhlar</th>
            <th class="px-2 py-2 text-left">Amallar</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-2 py-2 text-gray-500">{{ index + 1 }}</td>
            <td class="px-2 py-2 font-medium text-gray-900">{{ student.fullname }}</td>
            <td class="px-2 py-2">{{ student.age }}</td>
            <td class="px-2 py-2 hidden md:table-cell">{{ student.address }}</td>
            <td class="px-2 py-2 hidden sm:table-cell">
              <a :href="`tel:${student.phoneNumber}`" class="text-blue-600 hover:underline text-xs sm:text-sm">
                {{ student.phoneNumber }}
              </a>
            </td>
            <td class="px-2 py-2">
              <!-- Mobil: matn -->
              <div class="sm:hidden text-[10px] text-gray-700">
                {{ student.groups.map(group => group.name).join(', ') }}
              </div>
              <!-- Kompyuter: badge -->
              <div class="hidden sm:flex flex-wrap gap-1">
                <span
                  v-for="group in student.groups"
                  :key="group.id"
                  class="bg-blue-100 text-blue-700 text-[10px] px-2 py-[2px] rounded-full"
                >
                  {{ group.name }}
                </span>
              </div>
            </td>
            <td class="px-2 py-2">
              <div class="flex gap-1">
                <button
                  @click="viewStudent(student)"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-base px-1 py-[2px] rounded"
                >
                  <i class='bx bxs-eye-alt'></i>
                </button>
                <button
                  @click="editStudent(student)"
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


    <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200 hidden lg:block">
      <table class="min-w-full text-sm sm:text-base text-gray-700 divide-y divide-gray-100">
        <thead class="bg-gray-800 text-white text-xs sm:text-sm uppercase font-semibold">
          <tr>
            <th class="px-4 py-3 text-left">#</th>
            <th class="px-4 py-3 text-left">F.I.Sh.</th>
            <th class="px-4 py-3 text-left">Yosh</th>
            <th class="px-4 py-3 text-left hidden md:table-cell">Manzil</th>
            <th class="px-4 py-3 text-left hidden sm:table-cell">Telefon</th>
            <th class="px-4 py-3 text-left">Guruhlar</th>
            <th class="px-4 py-3 text-left">Amallar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 text-gray-500">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ student.fullname }}</td>
            <td class="px-4 py-3">{{ student.age }}</td>
            <td class="px-4 py-3 hidden md:table-cell">{{ student.address }}</td>
            <td class="px-4 py-3 hidden sm:table-cell">
              <a :href="`tel:${student.phoneNumber}`" class="text-blue-600 hover:underline">
                {{ student.phoneNumber }}
              </a>
            </td>
            <td class="px-4 py-3">
              <div class="sm:hidden text-xs text-gray-700">
                {{ student.groups.map(group => group.name).join(', ') }}
              </div>
              <div class="hidden sm:flex flex-wrap gap-1">
                <span
                  v-for="group in student.groups"
                  :key="group.id"
                  class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ group.name }}
                </span>
              </div>
            </td>

            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  @click="viewStudent(student)"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-md sm:text-xl px-3 py-2 rounded-md"
                >
                  <i class='bx bxs-eye-alt'></i> 
                </button>
                <button
                  @click="editStudent(student)"
                  class="bg-green-500 hover:bg-green-600 text-white text-md sm:text-xl px-3 py-2 rounded-md"
                >
                  <i class='bx  bxs-edit-alt'></i> 
                </button>
              </div>
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
          <h3 class="text-lg sm:text-xl font-semibold mb-5">O‘quvchini tahrirlash</h3>

          <form v-if="selectedStudent" @submit.prevent="saveChanges" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-600">F.I.Sh.</label>
              <input v-model="selectedStudent.fullname" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600">Yosh</label>
              <input v-model="selectedStudent.age" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600">Manzil</label>
              <input v-model="selectedStudent.address" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm text-gray-600">Telefon</label>
              <input v-model="selectedStudent.phoneNumber" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const students = computed(() => store.getters['student/students']);
    const router = useRouter()
    const selectedStudent = ref(null);
    const isSidebarOpen = ref(false);

    const viewStudent = (student) => {
      router.push(`/students/${student.id}`);
    };

    const editStudent = (student) => {
      selectedStudent.value = { ...student }; 
      isSidebarOpen.value = true;
    };
    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };


    const saveChanges = async () => {
      if (!selectedStudent.value) return;
      try {
        await store.dispatch('student/updateStudent', selectedStudent.value);
        isSidebarOpen.value = false;
      } catch (error) {
        console.error("O'zgartirishda xatolik:", error);
      }
    };

    onMounted(() => {
      store.dispatch('student/getAllStudents');
    });

    return {
      students,
      selectedStudent,
      isSidebarOpen,
      closeSidebar,
      viewStudent,
      editStudent,
      saveChanges,
    };
  }
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
