import axios from "../../axios/settings";

const API_URL = `${import.meta.env.VITE_API_URL}/lessons`;

export default {
  namespaced: true,
  state: () => ({
    lessons: [],
  }),
  mutations: {
    SET_LESSONS(state, lessons) {
      state.lessons = lessons;
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
    async getLessonsByGroup({ commit }, groupId) {
      try {
        const response = await axios.get(`${API_URL}/group/${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });

        console.log('lessons:', response.data);
        
        commit("SET_LESSONS", response.data);
      } catch (error) {
        console.log("Darslarni olishda xatolik:", error);
      }
    },

    async addLesson({ commit }, payload) {
      console.log('payload: ', payload);
      
      try {
        const response = await axios.post(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            "Content-Type": "application/json",
          },
        });

        console.log('response: ', response);
        
        commit("ADD_LESSON", response.data);
      } catch (error) {
        console.log("Dars qo‘shishda xatolik:", error);
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
      } catch (error) {
        console.log("Darsni yangilashda xatolik:", error);
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
      } catch (error) {
        console.log("Darsni o‘chirishda xatolik:", error);
      }
    },
  },
  getters: {
    lessons(state) {
      return state.lessons;
    },
  },
};
