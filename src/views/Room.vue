<template>
  <div class="room-page">
    <slick-slider
      :height="400"
      :imgArray="imageArray"
      slickId="room-slick"
      id="room-slick"
    ></slick-slider>
    <el-row :gutter="20" class="container container--sm mx-auto">
      <el-col :span="24" :md="16" v-if="detailedRoom.id">
        <place-breadcrumb
          class="mt-3 mb-3"
          :items="[{name: detailedRoom.address}]"
        ></place-breadcrumb>
        <room-description
          :room="detailedRoom"
          :isBookmarked="isBookmarked"
          :bookmark="onPostNewBookmark"
          :removeBookmark="onDeleteBookmark"
        ></room-description>
        <div class="spacer"></div>
        <room-amenity
          :amenity="detailedRoom.place_facilities_attributes"
        ></room-amenity>
        <div class="spacer"></div>
        <room-price
          :price="detailedRoom.schedule_price_attributes"
          :currency="detailedRoom.policy_attributes.currency"></room-price>
        <div class="spacer"></div>
        <room-review 
          :reviews="roomReviews"
          :roomId="detailedRoom.id"></room-review>
        <div class="spacer"></div>
        <room-repay-rules :time="detailedRoom.rule_attributes"></room-repay-rules>
        <div class="spacer"></div>
        <room-map :center="centerMap"></room-map>
      </el-col>
      <el-col :span="24" :md="8" v-if="detailedRoom.id">
        <book-room
          :defaultInput="filterQuery"
          :defaultPrice="detailedRoom.schedule_price_attributes"
          :roomId="detailedRoom.id"
          :currency="detailedRoom.policy_attributes.currency"
          @book-room="bookRoom"
        ></book-room>
      </el-col>
    </el-row>
    <div class="container container--sm mx-auto" v-if="isLoggedIn">
      <div class="section-title mb-3">
        <el-row :gutter="10" class="d-flex align-items-center">
          <el-col :md="12">
            <h3 class="m-0">{{ $t("shared.recommend") }}</h3>
          </el-col>
        </el-row>
      </div>

      <div class="row">
        <div
          v-for="item in recommendedList"
          :key="item.id"
          class="col-xs-6 col-md-3 col-lg-20"
        >
          <room-preview :item="item" :currency="detailedRoom.policy_attributes.currency" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SlickSlider from "@/components/room/SlickSlider.vue";
import PlaceBreadcrumb from "@/components/room/PlaceBreadcrumb.vue";
import RoomDescription from "@/components/room/RoomDescription.vue";
import RoomAmenity from "@/components/room/RoomAmenity.vue";
import RoomPrice from "@/components/room/RoomPrice.vue";
// import RoomAvailability from "@/components/room/RoomAvailability.vue";
import RoomReview from "@/components/room/RoomReview.vue";
import RoomRepayRules from "@/components/room/RoomRepayRules.vue";
import RoomMap from "@/components/room/RoomMap.vue";
import BookRoom from "@/components/room/BookRoom.vue";
import RoomPreview from "@/components/search/RoomPreview.vue";

import {
  DETAILED_ROOM,
} from "@/test/testData.js";

import placeApi from '@/api/services/placeApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'
import { ElNotification } from "element-plus";

export default {
  components: {
    SlickSlider,
    PlaceBreadcrumb,
    RoomDescription,
    RoomAmenity,
    RoomPrice,
    RoomReview,
    RoomRepayRules,
    RoomMap,
    BookRoom,
    RoomPreview
  },

  setup() {
    const route = useRoute();

    const store = useStore();

    let filterQuery = ref(route.query);

    const centerMap = computed(() => ({
      lat: DETAILED_ROOM.address.data.latitude,
      lng: DETAILED_ROOM.address.data.longitude,
    }));

    let detailedRoom = ref({})
    const roomId = filterQuery.value.id

    let imageArray = ref([])
    function transformImageArray() {
      imageArray.value = detailedRoom.value.overviews_attributes.map(e => e.image)
    }

    async function onGetPlaceById() {
      const handler = new ApiHandler()
                          .setData({id: roomId})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            detailedRoom.value = data.data
                            transformImageArray()
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.getPlaceById(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    let roomReviews = ref([])

    async function onGetPlaceRatings() {
      const handler = new ApiHandler()
                          .setData({id: roomId})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            roomReviews.value = data.data
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.getPlaceRatings(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    function bookRoom() {
      store.commit("changeCurrentRoom", detailedRoom.value);
    }

    let isBookmarked = ref(false)

    async function onGetCheckBookmark() {
      const reqBody = {
        place_id: roomId
      }

      const handler = new ApiHandler()
                          .setData(reqBody)
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            isBookmarked.value = data.data
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.getCheckBookMark(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    async function onPostNewBookmark() {
      const reqBody = {
        place_id: roomId
      }

      const handler = new ApiHandler()
                          .setData(reqBody)
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            if (data.isError()) {
                              ElNotification({
                                title: "Oh no! There's an error bookmarking this room",
                                message: data.error,
                                type: "error",
                              });
                            } else {
                              isBookmarked.value = true
                              ElNotification({
                                title: "Successfully!",
                                message: "This place has been bookmarked",
                                type: "success",
                              });
                            }
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.postNewBookmark(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    async function onDeleteBookmark() {
      const reqBody = {
        place_id: roomId
      }

      const handler = new ApiHandler()
                          .setData(reqBody)
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            if (data.isError()) {
                              ElNotification({
                                title: "Oh no! There's an error removing bookmark",
                                message: data.error,
                                type: "error",
                              });
                            } else {
                              isBookmarked.value = false
                              ElNotification({
                                title: "Successfully!",
                                message: "Bookmark has been removed",
                                type: "success",
                              });
                            }
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.deleteBookmark(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    let isLoggedIn = computed(() => store.getters.isLoggedIn)
    let recommendedList = ref([])

    async function onGetRecommendByPlace() {
      const handler = new ApiHandler()
                          .setData({id: roomId})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            recommendedList.value = data.data
                          })
                          .setOnFinally(() => {})

      const onRequest = async () => {
        return placeApi.getRecommendByPlace(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    onMounted(() => {
      onGetPlaceById()
      onGetPlaceRatings()

      if (isLoggedIn.value) {
        onGetCheckBookmark()
        onGetRecommendByPlace()
      }
    })

    return {
      filterQuery,
      centerMap,
      detailedRoom,
      imageArray,
      roomReviews,
      isBookmarked,
      onPostNewBookmark,
      onDeleteBookmark,
      DETAILED_ROOM,
      bookRoom,
      isLoggedIn,
      recommendedList
    };
  },
};
</script>