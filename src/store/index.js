import { createStore } from "vuex";
import payment from './modules/payment'
import place from './modules/place'
import user from './modules/user'

import { CURRENCIES_OBJ } from '../consts/billingConsts'

export default createStore({
  state: {
    currency: CURRENCIES_OBJ.en.name,
    currentRoom: {}
  },
  mutations: {
    changeCurrency(state, value) {
      state.currency = value
    },
    changeCurrentRoom(state, value) {
      state.currentRoom = value
    }
  },
  actions: {},
  modules: {
    payment,
    place,
    user
  },
});
