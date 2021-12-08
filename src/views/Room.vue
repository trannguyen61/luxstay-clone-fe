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
        <room-description :room="detailedRoom"></room-description>
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

import {
  IMAGES_SLICK_ARRAY,
  DETAILED_ROOM,
  ROOM_AVAILABILITY,
  ROOM_DETAIL_PRICED,
  ROOM_REVIEW
} from "@/test/testData.js";

import placeApi from '@/api/services/placeApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'

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

    onMounted(() => {
      onGetPlaceById()
      onGetPlaceRatings()
    })

    return {
      filterQuery,
      centerMap,
      detailedRoom,
      imageArray,
      roomReviews,
      IMAGES_SLICK_ARRAY,
      DETAILED_ROOM,
      ROOM_AVAILABILITY,
      ROOM_DETAIL_PRICED,
      ROOM_REVIEW,
      bookRoom
    };
  },
};
</script>