<template>
  <div class="room-page">
    <slick-slider
      :height="400"
      :imgArray="IMAGES_SLICK_ARRAY"
      slickId="room-slick"
      id="room-slick"
    ></slick-slider>
    <el-row :gutter="20" class="container container--sm mx-auto">
      <el-col :span="24" :md="16">
        <place-breadcrumb
          class="mt-3 mb-3"
          :items="DETAILED_ROOM.destinations.data"
        ></place-breadcrumb>
        <room-description :room="DETAILED_ROOM"></room-description>
        <div class="spacer"></div>
        <room-amenity
          :amenity="DETAILED_ROOM.amenities.data"
          :amenityTypes="DETAILED_ROOM.amenityTypes.data"
        ></room-amenity>
        <div class="spacer"></div>
        <room-price :price="DETAILED_ROOM.price.data"></room-price>
        <div class="spacer"></div>
        <room-availability :avai="ROOM_AVAILABILITY['1']"></room-availability>
        <div class="spacer"></div>
        <room-repay-rules :time="DETAILED_ROOM.price.data"></room-repay-rules>
        <div class="spacer"></div>
        <room-map :center="centerMap"></room-map>
      </el-col>
      <el-col :span="24" :md="8">
        <book-room :defaultInput="filterQuery" :defaultPrice="DETAILED_ROOM.price.data" :detail="ROOM_DETAIL_PRICED.origin"></book-room>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useRoute } from 'vue-router'

import SlickSlider from "@/components/room/SlickSlider.vue";
import PlaceBreadcrumb from "@/components/room/PlaceBreadcrumb.vue";
import RoomDescription from "@/components/room/RoomDescription.vue";
import RoomAmenity from "@/components/room/RoomAmenity.vue";
import RoomPrice from "@/components/room/RoomPrice.vue";
import RoomAvailability from "@/components/room/RoomAvailability.vue";
import RoomRepayRules from "@/components/room/RoomRepayRules.vue";
import RoomMap from "@/components/room/RoomMap.vue";
import BookRoom from "@/components/room/BookRoom.vue";

import {
  IMAGES_SLICK_ARRAY,
  DETAILED_ROOM,
  ROOM_AVAILABILITY,
  ROOM_DETAIL_PRICED
} from "@/test/testData.js";

export default {
  components: {
    SlickSlider,
    PlaceBreadcrumb,
    RoomDescription,
    RoomAmenity,
    RoomPrice,
    RoomAvailability,
    RoomRepayRules,
    RoomMap,
    BookRoom,
  },

  setup() {
    const route = useRoute()

    let filterQuery = ref(route.query)

    const centerMap = computed(() => ({
      lat: DETAILED_ROOM.address.data.latitude,
      lng: DETAILED_ROOM.address.data.longitude,
    }));

    return {
      filterQuery,
      centerMap,
      IMAGES_SLICK_ARRAY,
      DETAILED_ROOM,
      ROOM_AVAILABILITY,
      ROOM_DETAIL_PRICED
    };
  },
};
</script>