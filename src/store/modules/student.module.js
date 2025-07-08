import axios from "../../axios/settings";
import { useToast } from "vue-toastification";

const toast = useToast(); // Vue kontekstida to'g'ri ishlatilmoqda

const API_URL = `${import.meta.env.VITE_API_URL}/students`;

export default {
  namespaced: true,
  state: () => ({
    students: [],
  }),
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    ADD_STUDENT(state, payload) {
      state.students.unshift(payload);
    },
    UPDATE_STUDENT(state, payload) {
      const index = state.students.findIndex((u) => u.id === payload.id);
      if (index !== -1) state.students.splice(index, 1, payload);
    },
    DELETE_STUDENT(state, studentId) {
      state.students = state.students.filter((student) => student.id !== studentId);
    },
  },
  actions: {
    async getAllStudents({ commit }) {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        const teacherInfo = JSON.parse(localStorage.getItem("teacher"))
        const filteredStudents = response.data.filter((f) => {
          return f.groups?.some(group => group.courseId === teacherInfo.courseId);
        });
        
        commit("SET_STUDENTS", filteredStudents);
      } catch (e) {
        toast.error(e.response?.data?.message || "O‘quvchilarni olishda xatolik yuz berdi!");
      }
    },

    async getStudentByCourseId(_, Id) {
      try {
        const response = await axios.get(`${API_URL}/${Id}/pending-students`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (e) {
        toast.error(e.response?.data?.message || "Kursga tegishli o‘quvchilarni olishda xatolik.");
      }
    },

    async getStudentById(_, Id) {
      try {
        const response = await axios.get(`${API_URL}/${Id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        return response.data;
      } catch (e) {
        toast.error(e.response?.data?.message || "O‘quvchini olishda xatolik yuz berdi!");
      }
    },

    async addStudent({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const response = await axios.post(API_URL, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("ADD_STUDENT", response.data.student);
        toast.success(response.data.message || "O‘quvchi muvaffaqiyatli qo‘shildi.");
      } catch (e) {
        toast.error(e.response?.data?.message || "O‘quvchi qo‘shishda xatolik yuz berdi.");
      }
    },

    async updateStudent({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        await axios.put(`${API_URL}/${payload.id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
          },
        });
        commit("UPDATE_STUDENT", payload);
        toast.success("O‘quvchi ma’lumotlari yangilandi.");
      } catch (e) {
        toast.error("O‘quvchini yangilashda xatolik yuz berdi.");
      }
    },

    async deleteStudent({ commit }, Id) {
      commit("SET_LOADING", true, { root: true });
      try {
        const response = await axios.delete(`${API_URL}/${Id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
        });
        commit("DELETE_STUDENT", Id);
        toast.success(response.data.message || "O‘quvchi muvaffaqiyatli o‘chirildi.");
      } catch (e) {
        toast.error(e.response?.data?.message || "O‘quvchini o‘chirishda xatolik yuz berdi.");
      }
    },
  },
  getters: {
    students(state) {
      return state.students;
    },
  },
};
