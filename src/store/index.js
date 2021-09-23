import { createStore } from "vuex";

import { CURRENCIES_OBJ } from '../consts/billingConsts'

export default createStore({
  state: {
    currency: CURRENCIES_OBJ.vi.name
  },
  mutations: {
    changeCurrency(state, value) {
      state.currency = value
    }
  },
  actions: {},
  modules: {},
});
