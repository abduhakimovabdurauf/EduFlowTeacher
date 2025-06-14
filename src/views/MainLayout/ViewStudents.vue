<template>
  <div class="mx-auto px-4 py-10">
    <h2 class="text-3xl font-semibold text-gray-800 mb-8">O'quvchilar ro'yxati</h2>

    <div class="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table class="min-w-full divide-y divide-gray-100 text-sm">
        <thead class="bg-gray-700 text-white uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th class="px-6 py-4 text-left">#</th>
            <th class="px-6 py-4 text-left">F.I.Sh.</th>
            <th class="px-6 py-4 text-left">Yosh</th>
            <th class="px-6 py-4 text-left">Manzil</th>
            <th class="px-6 py-4 text-left">Telefon</th>
            <th class="px-6 py-4 text-left">Guruhlar</th>
            <th class="px-6 py-4 text-left">Amallar</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-2 text-gray-500 font-medium">{{ index + 1 }}</td>
            <td class="px-6 py-2 text-gray-900 font-semibold">{{ student.fullname }}</td>
            <td class="px-6 py-2">{{ student.age }}</td>
            <td class="px-6 py-2">{{ student.address }}</td>
            <td class="px-6 py-2">
              <a :href="`tel:${student.phoneNumber}`" class="text-blue-600 hover:underline">
                {{ student.phoneNumber }}
              </a>
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="group in student.groups"
                  :key="group.id"
                  class="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {{ group.name }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  @click="viewStudent(student)"
                  class="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-lg"
                >
                  Ko'rish
                </button>
                <button
                  @click="editStudent(student)"
                  class="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-lg"
                >
                  O'zgartirish
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const students = computed(() => store.getters['student/students']);

    const viewStudent = (student) => {
      console.log("Ko'rish: ", student);
    };

    const editStudent = (student) => {
      console.log("O'zgartirish: ", student);
    };

    onMounted(() => {
      store.dispatch('student/getAllStudents');
    });

    return {
      students,
      viewStudent,
      editStudent,
    };
  },
};
</script>
