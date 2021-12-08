export default {
    state: {
        token: "",
        user: {},
        bookedList: []
    },
    getters: {
        isLoggedIn(state) {
            return state.token != '' || localStorage.getItem('token') != ""
        }
    },
    mutations: {
        changeToken(state, value) {
            state.token = value
            localStorage.setItem('token', value)
        },
        changeUser(state, value) {
            state.user = value
            localStorage.setItem('user', JSON.stringify(value))
        },
        changeBookedList(state, value) {
            state.bookedList = value
        }
    },
    actions: {} 
}