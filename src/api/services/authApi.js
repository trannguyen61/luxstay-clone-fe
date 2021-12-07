import { axiosInstance } from '../axios'

import { SIGNUP, SIGNIN } from '../baseApi'

export default {
    postSignUp(reqBody) {
        return axiosInstance.post(SIGNUP, reqBody)
    },
    postSignIn(reqBody) {
        return axiosInstance.post(SIGNIN, reqBody)
    }
}