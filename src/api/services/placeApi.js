import { axiosInstance } from "../axios";

import {
  GET_PLACE_BY_CITY,
  PAGE,
  COUNT,
  PLACE,
  RATING,
  POST_NEW_RATING,
  GET_CHECK_BOOKMARK,
  POST_NEW_BOOKMARK,
  DELETE_BOOKMARK,
  BOOKMARK,
  RECOMMENDER,
  GET_RECOMMEND_BY_CITY,
  GET_SEARCH_BY_NAME_OR_ADD,
  GET_FILTER
} from "../baseApi";

export default {
  getPlaceByCity({ place, page }) {
    return axiosInstance.get(`${GET_PLACE_BY_CITY}/${place}${PAGE}/${page}`);
  },
  getTotalNumberOfPlaceInCity({ place }) {
    return axiosInstance.get(`${GET_PLACE_BY_CITY}/${place}${COUNT}`);
  },
  getPlaceById({ id }) {
    return axiosInstance.get(`${PLACE}/${id}`);
  },
  getPlaceRatings({ id }) {
    return axiosInstance.get(`${PLACE}/${id}${RATING}`);
  },
  postNewRating({ id, reqBody }) {
    return axiosInstance.post(`${PLACE}/${id}${POST_NEW_RATING}`, reqBody);
  },
  getCheckBookMark(reqBody) {
    return axiosInstance.post(GET_CHECK_BOOKMARK, reqBody);
  },
  postNewBookmark(reqBody) {
    return axiosInstance.post(POST_NEW_BOOKMARK, reqBody);
  },
  deleteBookmark(reqBody) {
    return axiosInstance.delete(DELETE_BOOKMARK, { data: reqBody });
  },
  getUserBookmark() {
    return axiosInstance.get(BOOKMARK);
  },
  getRecommendByCity({ city, num_rec = 5 }) {
    return axiosInstance.get(`${GET_RECOMMEND_BY_CITY}/${city}`, { params: { num_rec } })
  },
  getRecommendByPlace({ id, num_rec = 5 }) {
    return axiosInstance.get(`${RECOMMENDER}/${id}`, { params: { num_rec } })
  },
  getSearchByNameOrAdd({ search, page }) {
    return axiosInstance.get(`${GET_SEARCH_BY_NAME_OR_ADD}/${search}/${page}`)
  },
  getFilter({params, page = 1}) {
    console.log(params)
    return axiosInstance.get(`${GET_FILTER}/${page}`, { params: { ...params } })
  },
};
