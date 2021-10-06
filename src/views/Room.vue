<template>
  <div class="room-page">
    <slick-slider
      :height="400"
      :imgArray="IMAGES_SLICK_ARRAY"
      slickId="room-slick"
      id="room-slick"
    ></slick-slider>
    <el-row class="container container--sm">
      <el-col :span="24" :md="16">
        <place-breadcrumb
          class="mt-3 mb-3"
          :items="DETAILED_ROOM.destinations.data"
        ></place-breadcrumb>
        <room-description :room="DETAILED_ROOM"></room-description>
        <div class="spacer"></div>
        <room-amenity :amenity="DETAILED_ROOM.amenities.data" :amenityTypes="DETAILED_ROOM.amenityTypes.data"></room-amenity>
        <div class="spacer"></div>
        <room-price :price="DETAILED_ROOM.price.data"></room-price>
        <div class="spacer"></div>
        <room-availability :avai="ROOM_AVAILABILITY['1']"></room-availability>
        <div class="spacer"></div>
        <room-repay-rules :time="DETAILED_ROOM.price.data"></room-repay-rules>
      </el-col>
      <el-col :span="24" :md="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import SlickSlider from "@/components/room/SlickSlider.vue";
import PlaceBreadcrumb from "@/components/room/PlaceBreadcrumb.vue";
import RoomDescription from "@/components/room/RoomDescription.vue";
import RoomAmenity from "@/components/room/RoomAmenity.vue";
import RoomPrice from "@/components/room/RoomPrice.vue";
import RoomAvailability from "@/components/room/RoomAvailability.vue";
import RoomRepayRules from "@/components/room/RoomRepayRules.vue";

import { IMAGES_SLICK_ARRAY, DETAILED_ROOM, ROOM_AVAILABILITY } from "@/test/testData.js";

export default {
  components: { SlickSlider, PlaceBreadcrumb, RoomDescription, RoomAmenity, RoomPrice, RoomAvailability, RoomRepayRules },

  setup() {
    return {
      IMAGES_SLICK_ARRAY,
      DETAILED_ROOM,
      ROOM_AVAILABILITY
    };
  },
};
</script>