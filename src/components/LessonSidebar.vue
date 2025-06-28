<template>
  <div v-if="show" class="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl z-50 overflow-y-auto transition-transform">
    <div class="p-4 border-b flex justify-between items-center">
      <h3 class="text-lg font-semibold">
        {{ isEditMode ? 'Darsni tahrirlash' : 'Yangi dars qo\'shish' }}
      </h3>
      <button @click="$emit('close')" class="text-gray-600 hover:text-black">&times;</button>
    </div>

    <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
      <div>
        <label class="block mb-1 text-sm font-medium">Dars nomi</label>
        <input type="text" v-model="form.name" class="w-full border rounded px-3 py-2" required />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Dars raqami</label>
        <input type="number" v-model.number="form.lessonNumber" class="w-full border rounded px-3 py-2" required />
      </div>

      <div>
        <label class="block mb-1 text-sm font-medium">Sana</label>
        <input type="datetime" v-model="form.date" class="w-full border rounded px-3 py-2" required />
      </div>

      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Bekor qilish</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded">
          {{ isEditMode ? 'Saqlash' : 'Qo\'shish' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    show: Boolean,
    lesson: Object,
    groupId: Number,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const form = ref({
      name: '',
      lessonNumber: null,
      date: '',
      groupId: props.groupId,
    });

    const isEditMode = computed(() => !!props.lesson?.id);

    watch(
      () => props.lesson,
      (newVal) => {
        if (newVal && newVal.id) {
          form.value = {
            name: newVal.name,
            lessonNumber: newVal.lessonNumber,
            date: newVal.date.split('T')[0],
          };
        } else {
          form.value = {
            name: '',
            lessonNumber: 1,
            date: '',
          };
        }
      },
      { immediate: true }
    );

    const handleSubmit = async () => {
      const payload = {
        ...form.value,
        groupId: props.groupId,
      };

      if (isEditMode.value) {
        await store.dispatch('lesson/updateLesson', { id: props.lesson.id, ...payload });
      } else {
        await store.dispatch('lesson/addLesson', payload);
      }
      emit('close');
    };

    return {
      form,
      isEditMode,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px #2563eb;
}
</style>