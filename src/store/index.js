import { createStore } from 'vuex';
import auth from './modules/auth.module.js'
import student from './modules/student.module.js'
import group from './modules/group.module.js'

const store = createStore({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        auth,
        student,
        group,
    }
})

export default store;