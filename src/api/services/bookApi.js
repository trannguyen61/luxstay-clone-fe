import { axiosInstance } from '../axios'

import { POST_NEW_BOOKING, GET_BOOKING_BY_USER } from '../baseApi'

export default {
    postNewBooking(reqBody) {
        return axiosInstance.post(POST_NEW_BOOKING, reqBody)
    },
    getBookingByUser({ id }) {
        return axiosInstance.get(`${GET_BOOKING_BY_USER}/${id}`)
    }
}