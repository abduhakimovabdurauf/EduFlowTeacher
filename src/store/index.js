import { createStore } from 'vuex';
import auth from './modules/auth.module.js'
import student from './modules/student.module.js'
import group from './modules/group.module.js'
import lesson from './modules/lesson.module.js'
import attendance from './modules/attendences.module.js'

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
        lesson,
        attendance,
    }
})

export default store;