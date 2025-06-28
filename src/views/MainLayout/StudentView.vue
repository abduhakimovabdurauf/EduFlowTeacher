<template>
  <div class="max-w-2xl mx-auto px-4 py-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">O'quvchi haqida ma'lumot</h2>

    <div v-if="student" class="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div>
        <span class="text-gray-500">F.I.Sh.:</span>
        <p class="text-gray-800 font-medium">{{ student.fullname }}</p>
      </div>
      <div>
        <span class="text-gray-500">Yosh:</span>
        <p class="text-gray-800 font-medium">{{ student.age }}</p>
      </div>
      <div>
        <span class="text-gray-500">Manzil:</span>
        <p class="text-gray-800 font-medium">{{ student.address }}</p>
      </div>
      <div>
        <span class="text-gray-500">Telefon:</span>
        <a :href="`tel:${student.phoneNumber}`" class="text-blue-600 hover:underline block">
          {{ student.phoneNumber }}
        </a>
      </div>
      <div v-if="student.groups?.length">
        <span class="text-gray-500">Guruhlar:</span>
        <div class="flex flex-wrap gap-2 mt-1">
          <span
            v-for="group in student.groups"
            :key="group.id"
            class="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium"
          >
            {{ group.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const student = ref(null);

    const getStudent = async () => {
      const data = await store.dispatch('student/getStudentById', route.params.id);
      student.value = data;

      console.log(data);
      
    };

    onMounted(() => {
      getStudent();
    });

    return {
      student
    };
  }
};
</script>
