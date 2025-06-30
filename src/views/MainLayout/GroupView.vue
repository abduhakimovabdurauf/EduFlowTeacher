<template>
  <div class="p-2 sm:p-4 space-y-4 sm:space-y-6">
    <!-- Responsive Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-2 sm:gap-4">
      <!-- Guruh haqida -->
      <div class="border rounded-xl p-3 sm:p-4 bg-white text-sm sm:text-base">
        <p><strong>Nomi:</strong> {{ group.name }}</p>
        <p><strong>O‘qituvchi:</strong> {{ group.teacher?.user?.firstname }} {{ group.teacher?.user?.lastname }}</p>
        <p><strong>Holati:</strong> {{ group.isStatus === 0 ? 'Active' : 'Arxivlangan' }}</p>
        <p><strong>To‘lov:</strong> <button class="text-blue-600 underline hover:text-blue-800">Ko‘rish</button></p>
        <p><strong>Boshlanish sanasi:</strong> {{ group.startDate }}</p>
      </div>

      <!-- Jadval -->
      <div class="flex flex-col w-full overflow-x-auto rounded xl:col-span-2 space-y-2">
        <!-- + tugmasi -->
        <div class="flex justify-end pr-2">
          <button
            @click="addNewLesson"
            class="text-white bg-green-500 font-bold w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-md text-xl sm:text-2xl hover:bg-green-600 transition"
          >
            +
          </button>
        </div>

        <div class="flex">
          <!-- FISH jadvali -->
          <div class="flex-none">
            <table class="border-collapse text-xs sm:text-sm table-fixed">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border px-0 sm:px-2 py-1 sm:py-2 w-[30px] sm:w-[50px] h-[40px] sm:h-[45px] leading-none text-center align-middle">#</th>
                  <th class="border px-0 sm:px-2 py-1 sm:py-2 w-[100px] sm:w-[200px] h-[40px] sm:h-[45px] leading-none text-center align-middle">FISH</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="student?.id">
                  <td class="border px-1 sm:px-2 py-1 sm:py-2 w-[30px] sm:w-[50px] h-[40px] sm:h-[45px] leading-none text-center align-middle">{{ index + 1 }}</td>
                  <td class="border px-1 sm:px-2 py-1 sm:py-2 w-[100px] sm:w-[200px] h-[40px] sm:h-[45px] leading-none text-center align-middle whitespace-nowrap">{{ student?.fullname }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Darslar jadvali -->
          <div class="overflow-x-auto">
            <table class="border-collapse text-xs sm:text-sm table-fixed">
              <thead>
                <tr class="bg-gray-100 text-center">
                  <th
                    v-for="lesson in lessons"
                    :key="lesson?.id"
                    class="border px-1 sm:px-2 py-1 sm:py-2 h-[40px] sm:h-[45px] w-[80px] sm:w-[100px] min-w-[80px] sm:min-w-[100px] max-w-[80px] sm:max-w-[100px] leading-none text-center align-middle"
                  >
                    <div class="font-medium">{{ lesson?.lessonNumber }}</div>
                    <div class="text-[10px] sm:text-xs text-gray-500">{{ formatDate(lesson?.date) }}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="student in students" :key="student?.id">
                  <td
                    v-for="lesson in lessons"
                    :key="lesson?.id"
                    class="border h-[40px] sm:h-[45px] px-1 sm:px-2 py-1 sm:py-2 w-[80px] sm:w-[100px] leading-none text-center align-middle"
                  >
                    <input
                      type="checkbox"
                      :checked="getAttendance(student?.id, lesson?.id)?.isActived || false"
                      @change="toggleAttendance(student?.id, lesson?.id, $event.target.checked)"
                      class="accent-green-600 w-4 h-4"
                    />
                  </td>
                </tr>
              </tbody>
            </table> 
          </div>
        </div>
      </div>
    </div>

    <!-- Saqlash tugmasi -->
    <div class="flex justify-end">
      <button
        @click="saveAll"
        class="bg-green-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded hover:opacity-90 transition"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>




<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const group = ref({ teacher: { user: {} } });
const students = ref([]);
const lessons = ref([]);
const allAttendances = ref([]);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('uz-UZ');
};

onMounted(async () => {
  const id = route.params.id;

  group.value = await store.dispatch('group/getGroupById', id);
  students.value = group.value.students;

  await store.dispatch('lesson/getLessonsByGroup', group.value.id);
  lessons.value = store.getters['lesson/lessons'];

  await store.dispatch('attendance/getAllAttendances');
  allAttendances.value = store.getters['attendance/attendances'];
});

const getAttendance = (studentId, lessonId) => {
  return allAttendances.value.find(a => a.studentId === studentId && a.lessonId === lessonId) || null;
};

const addNewLesson = async () => {
  const newLessonPayload = {
    name: 'Yangi dars',
    groupId: group.value.id,
    date: new Date().toISOString(),
    lessonNumber: lessons.value.length + 1,
  };

  await store.dispatch('lesson/addLesson', newLessonPayload);
  await store.dispatch('lesson/getLessonsByGroup', group.value.id);
  lessons.value = store.getters['lesson/lessons'];

  const addedLesson = lessons.value.find(l => l.lessonNumber === newLessonPayload.lessonNumber);

  for (const student of students.value) {
    await store.dispatch('attendance/addAttendance', {
      studentId: student.id,
      lessonId: addedLesson?.id,
      date: addedLesson?.date,
      isActived: false,
    });
  }

  await store.dispatch('attendance/getAllAttendances');
  allAttendances.value = store.getters['attendance/attendances'];
};

const toggleAttendance = (studentId, lessonId, isChecked) => {
  const attendance = allAttendances.value.find(
    (a) => a.studentId === studentId && a.lessonId === lessonId
  );

  if (attendance) {
    attendance.isActived = isChecked;
  }
};

const saveAll = async () => {
  const payload = allAttendances.value.map(a => ({
    id: a.id,
    studentId: a.studentId,
    lessonId: a.lessonId,
    date: a.date,
    isActived: a.isActived,
  }));
  await store.dispatch('attendance/updateAttendanceRange', payload);
};
</script>