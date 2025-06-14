import axios from "../../axios/settings";
// import { useToast } from "vue-toastification";

// const toast = useToast();
const API_URL = `${import.meta.env.VITE_API_URL}/groups`;

export default {
    namespaced: true,
    state: () => ({
        groups: []
    }),
    mutations: {
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        ADD_GROUP(state, payload) {
            state.groups.unshift(payload);
        },
        UPDATE_GROUP(state, payload) {
            const index = state.groups.findIndex((g) => g.id === payload.id);
            if (index !== -1) state.groups.splice(index, 1, payload);
        },
        DELETE_GROUP(state, groupId) {
            state.groups = state.groups.filter((group) => group.id !== groupId);
        },
    },
    actions: {
        async getAllGroups({ commit }) {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                console.log(response);
                
                commit("SET_GROUPS", response.data);
            } catch (e) {
                console.log(e);
            }
        },
        async getGroupById({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                // toast.error(e.response?.data?.message || "Guruhni olishda xatolik!");
            }
        },
        async addGroup({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_GROUP", response.data.group);
                // toast.success(response.data.message);
            } catch (e) {
                console.log(e);
                // toast.error(e.response?.data?.message || "Guruh qo'shishda xatolik!");
            }
        },
        async updateGroup({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_GROUP", response.data.group);
                // toast.success(response.data.message);
            } catch (e) {
                // toast.error(e.response?.data?.message || "Guruhni yangilashda xatolik!");
            }
        },
        async deleteGroup({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_GROUP", Id);
                // toast.success(response.data.message);
            } catch (e) {
                // toast.error(e.response?.data?.message || "Guruhni o'chirishda xatolik!");
            }
        },
    },
    getters: {
        groups(state) {
            return state.groups;
        }
    }
};
