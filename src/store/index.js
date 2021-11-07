import { createStore } from "vuex";
import payment from './modules/payment'

import { CURRENCIES_OBJ } from '../consts/billingConsts'

export default createStore({
  state: {
    currency: CURRENCIES_OBJ.vi.name,
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
    payment
  },
});
