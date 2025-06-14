import axios from "../../axios/settings";
// import { useToast } from "vue-toastification";

// const toast = useToast();
const API_URL = `${import.meta.env.VITE_API_URL}/students`;

export default {
    namespaced: true,
    state: () => ({
        students: []
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
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('response: ', response);
                
                commit("SET_STUDENTS", response.data);
            } catch (e) {
                // toast.error(e.response?.data?.message || "Oquvchi malumotlarni olishda xatolik!");
                console.log(e)
            }
        },
        async getStudentByCourseId({ commit }, Id) {
            try {
                const response = await axios.get(`${API_URL}/${Id}/pending-students`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log(response)
                return response.data;
            } catch (e) {
                // toast.error(e.response?.data?.message || "Failed to fetch student!");
            }
        },

        async getStudentById({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                // toast.error(e.response?.data?.message || "Failed to fetch student!");
            }
        },
        async addStudent({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            console.log('taken data: ', payload)
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_STUDENT", response.data.student);
                // toast.success(response.data.message);
            } catch (e) {
                // toast.error(e.response?.data?.message || "O'quvchi qo'shishda xatolik!");
                console.log(e)
            }
        },
        async updateStudent({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            console.log("payload.id: ", payload);
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_STUDENT", response.data.student);
                // toast.success(response.data.message);
            } catch (e) {
                // toast.error(e.response?.data?.message || "Oquvchi malumotlarini yangilashda xatolik!");
            }
        },
        async deleteStudent({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response= await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_STUDENT", Id);
                // toast.success(response.data.message);
            } catch (e) {
                // toast.error(e.response?.data?.message || "O`quvchi malumotlarini o'chirishda xatolik!");
            }
        },
    },
    getters: {
        students(state) {
            return state.students
        }
    }
};
