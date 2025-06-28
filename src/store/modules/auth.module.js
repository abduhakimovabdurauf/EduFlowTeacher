import axios from "../../axios/settings.js";
import router from "../../router/index.js";

// JWT tokenni ajratib, foydalanuvchi ma’lumotlarini olish
function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const jsonPayload = atob(base64Payload);
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT parsing error:", e);
        return null;
    }
}

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("jwt-token", token);
            localStorage.setItem("jwt-token-expiry", Date.now() + 8 * 60 * 60 * 1000); // 8 soat

            // 🔥 Foydalanuvchi ma’lumotlarini ajratib olish va localStoragega saqlash
            const userData = parseJwt(token);
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("jwt-token-expiry");
            localStorage.removeItem("user");
            router.push("/login");
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/auth/login`;
                const response = await axios.post(url, payload);
                const token = response?.data;
                commit("setToken", token);
                return parseJwt(token); // foydalanuvchini qaytarish uchun
            } catch (e) {
                console.error("Login error:", e.message);
            }
        },
        async logout({ commit }) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/logout`;
                await axios.post(url, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("LOGOUT");
            } catch (e) {
                console.error("Logout error:", e.message);
            }
        },
        checkToken({ commit, dispatch }) {
            const token = localStorage.getItem("jwt-token");
            const expiry = localStorage.getItem("jwt-token-expiry");

            if (token && expiry) {
                if (Date.now() > expiry) {
                    console.warn("Token muddati tugagan!");
                    dispatch("logout");
                } else {
                    commit("setToken", token);
                }
            } else {
                commit("LOGOUT");
            }
        }
    },
    getters: {
        token: (state) => state.token,
        isAuthenticated: (state) => !!state.token,
        user: () => {
            try {
                return JSON.parse(localStorage.getItem("user"));
            } catch {
                return null;
            }
        }
    },
};
