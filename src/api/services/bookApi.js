import { axiosInstance } from '../axios'

import { POST_NEW_BOOKING } from '../baseApi'

export default {
    postNewBooking(reqBody) {
        return axiosInstance.post(POST_NEW_BOOKING, reqBody)
    }
}