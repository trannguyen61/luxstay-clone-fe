import { axiosInstance } from '../axios'

import { GET_PLACE_BY_CITY, PAGE, COUNT } from '../baseApi'

export default {
    getPlaceByCity({ place, page }) {
        return axiosInstance.get(`${GET_PLACE_BY_CITY}/${place}${PAGE}/${page}`)
    },
    getTotalNumberOfPlaceInCity({ place }) {
        return axiosInstance.get(`${GET_PLACE_BY_CITY}/${place}${COUNT}`)
    }
}