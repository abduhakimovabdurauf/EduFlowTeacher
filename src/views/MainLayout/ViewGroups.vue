<template>
  <div class="mx-auto px-4 py-10">
    <h2 class="text-3xl font-semibold text-gray-800 mb-8">Guruhlar ro'yxati</h2>

    <div class="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table class="min-w-full divide-y divide-gray-100 text-sm">
        <thead class="bg-gray-700 text-white uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th class="px-6 py-4 text-left">#</th>
            <th class="px-6 py-4 text-left">Nomi</th>
            <th class="px-6 py-4 text-left">Kurs</th>
            <th class="px-6 py-4 text-left">O‘qituvchi</th>
            <th class="px-6 py-4 text-left">O‘quvchilar</th>
            <th class="px-6 py-4 text-left">Holati</th>
            <th class="px-6 py-4 text-left">Boshlangan sana</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(group, index) in groups"
            :key="group.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-2 text-gray-500 font-medium">{{ index + 1 }}</td>
            <td class="px-6 py-2 font-semibold text-gray-900">{{ group.name }}</td>
            <td class="px-6 py-2">{{ group.course?.name }}</td>
            <td class="px-6 py-2">{{ group.teacher?.user?.firstname +' '+ group.teacher?.user?.lastname }}</td>
            <td class="px-6 py-2">{{ group.students?.length }} ta</td>
            <td class="px-6 py-2">
              <span
                :class="group.isStatus === 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'"
              >
                {{ group.isStatus === 0 ? 'Aktiv' : 'Arxivlangan' }}
              </span>
            </td>
            <td class="px-6 py-2">
              {{ new Date(group.createdAt).toLocaleDateString('uz-UZ') }}
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
    const groups = computed(() => store.getters['group/groups']);

    const viewGroup = (group) => {
      console.log("Ko'rish: ", group);
    };

    const editGroup = (group) => {
      console.log("O'zgartirish: ", group);
    };

    onMounted(() => {
      store.dispatch('group/getAllGroups');
    });

    return {
      groups,
      viewGroup,
      editGroup,
    };
  },
};
</script>
