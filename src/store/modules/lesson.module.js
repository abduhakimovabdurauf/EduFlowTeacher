import axios from "../../axios/settings";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/lessons`;

export default {
  namespaced: true,
  state: () => ({
    lessons: [],
  }),

  mutations: {
    SET_LESSONS(state, lessons) {
      state.lessons = lessons.slice().reverse();
    },
    ADD_LESSON(state, lesson) {
      state.lessons.unshift(lesson);
    },
    UPDATE_LESSON(state, updatedLesson) {
      const index = state.lessons.findIndex((l) => l.id === updatedLesson.id);
      if (index !== -1) state.lessons.splice(index, 1, updatedLesson);
    },
    DELETE_LESSON(state, lessonId) {
      state.lessons = state.lessons.filter((lesson) => lesson.id !== lessonId);
    },
  },

  actions: {
    async getAllLessons({ commit }) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("SET_LESSONS", response.data);
        return response.data;
      } catch (error) {
        toast.error("Barcha darslarni olishda xatolik yuz berdi.");
      }
    },

    async getLessonsByGroup({ commit }, groupId) {
      try {
        const response = await axios.get(`${API_URL}/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("SET_LESSONS", response.data);
      } catch (error) {
        toast.error("Guruh darslarini olishda xatolik yuz berdi.");
      }
    },

    async getLessonById(_, id) {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (error) {
        toast.error("Darsni olishda xatolik yuz berdi.");
      }
    },

    async addLesson({ commit }, payload) {
      try {
        const response = await axios.post(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            "Content-Type": "application/json",
          },
        });
        commit("ADD_LESSON", response.data);
        toast.success("Dars muvaffaqiyatli qo‘shildi!");
      } catch (error) {
        toast.error("Dars qo‘shishda xatolik yuz berdi.");
      }
    },

    async updateLesson({ commit }, payload) {
      try {
        const response = await axios.put(`${API_URL}/${payload.id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            "Content-Type": "application/json",
          },
        });
        commit("UPDATE_LESSON", response.data);
        toast.success("Dars muvaffaqiyatli yangilandi!");
      } catch (error) {
        toast.error("Darsni yangilashda xatolik yuz berdi.");
      }
    },

    async deleteLesson({ commit }, lessonId) {
      try {
        await axios.delete(`${API_URL}/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("DELETE_LESSON", lessonId);
        toast.success("Dars muvaffaqiyatli o‘chirildi!");
      } catch (error) {
        toast.error("Darsni o‘chirishda xatolik yuz berdi.");
      }
    },
  },

  getters: {
    lessons(state) {
      return state.lessons;
    },
  },
};
