import axios from "../../axios/settings";
import { useToast } from "vue-toastification";

const toast = useToast(); // bevosita ishlatilmoqda

const API_URL = `${import.meta.env.VITE_API_URL}/attendances`;

export default {
  namespaced: true,
  state: () => ({
    attendances: [],
  }),
  mutations: {
    SET_ATTENDANCES(state, attendances) {
      state.attendances = attendances;
    },
    ADD_ATTENDANCE(state, attendance) {
      state.attendances.unshift(attendance);
    },
    UPDATE_ATTENDANCE(state, updated) {
      const index = state.attendances.findIndex(a => a.id === updated.id);
      if (index !== -1) state.attendances.splice(index, 1, updated);
    },
    DELETE_ATTENDANCE(state, id) {
      state.attendances = state.attendances.filter(a => a.id !== id);
    },
  },
  actions: {
    async getAllAttendances({ commit }) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("SET_ATTENDANCES", response.data);
      } catch (e) {
        toast.error("Davomatlarni olishda xatolik yuz berdi.");
      }
    },

    async getAttendanceById(_, id) {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (e) {
        toast.error("Davomatni olishda xatolik yuz berdi.");
      }
    },

    async getAttendancesByStudent(_, studentId) {
      try {
        const response = await axios.get(`${API_URL}/${studentId}/student`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (e) {
        toast.error("O‘quvchi bo‘yicha davomatni olishda xatolik.");
      }
    },

    async getAttendancesByLesson(_, lessonId) {
      try {
        const response = await axios.get(`${API_URL}/${lessonId}/lesson`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (e) {
        toast.error("Dars bo‘yicha davomatni olishda xatolik.");
      }
    },

    async addAttendance({ commit }, payload) {
      try {
        const response = await axios.post(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("ADD_ATTENDANCE", response.data);
      } catch (e) {
        console.error("Davomat qo‘shishda xatolik yuz berdi.");
      }
    },

    async updateAttendance({ commit }, payload) {
      try {
        const response = await axios.put(`${API_URL}/${payload.id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("UPDATE_ATTENDANCE", response.data);
        toast.success("Davomat muvaffaqiyatli yangilandi!");
      } catch (e) {
        toast.error("Davomatni yangilashda xatolik yuz berdi.");
      }
    },

    async updateAttendanceRange(_, payloadArray) {
      try {
        await axios.put(`${API_URL}/update-range`, payloadArray, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        toast.success("Davomatlar ro'yxati muvaffaqiyatli yangilandi!");
      } catch (e) {
        toast.error("Davomatlar ro'yxatini yangilashda xatolik.");
      }
    },

    async deleteAttendance({ commit }, id) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("DELETE_ATTENDANCE", id);
        toast.success("Davomat muvaffaqiyatli o‘chirildi!");
      } catch (e) {
        toast.error("Davomatni o‘chirishda xatolik yuz berdi.");
      }
    },
  },
  getters: {
    attendances(state) {
      return state.attendances;
    },
  },
};
