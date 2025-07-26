<template>
  <div class="max-w-5xl mx-auto px-4 py-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">O'quvchi haqida ma'lumot</h2>

    <!-- Student info -->
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

      <!-- Guruhlar -->
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

    <!-- To'lovlar jadvali -->
    <div v-if="student?.payments?.length" class="mt-10">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">To‘lovlar tarixi</h3>

      <div class="overflow-x-auto rounded-lg shadow">
        <table class="min-w-full bg-white text-sm text-left text-gray-700">
          <thead class="bg-gray-700 text-white uppercase text-xs">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Sana</th>
              <th class="px-4 py-3">Miqdori</th>
              <th class="px-4 py-3">Izoh</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(payment, index) in student.payments"
              :key="index"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 font-medium">{{ index + 1 }}</td>
              <td class="px-4 py-3">{{ formatDate(payment.paymentDate) }}</td>
              <td class="px-4 py-3">{{ payment.amount }} so'm</td>
              <td class="px-4 py-3">{{ payment.comment || '-' }}</td>
            </tr>
          </tbody>
        </table>
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
      console.log('Student data:', student.value);
      
    };

    const formatDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleDateString('uz-UZ', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    };

    onMounted(() => {
      getStudent();
    });

    return {
      student,
      formatDate
    };
  }
};
</script>
