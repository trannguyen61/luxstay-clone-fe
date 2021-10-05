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
      </el-col>
      <el-col :span="24" :md="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import SlickSlider from "@/components/room/SlickSlider.vue";
import PlaceBreadcrumb from "@/components/room/PlaceBreadcrumb.vue";
import RoomDescription from "@/components/room/RoomDescription.vue";

import { IMAGES_SLICK_ARRAY, DETAILED_ROOM } from "@/test/testData.js";

export default {
  components: { SlickSlider, PlaceBreadcrumb, RoomDescription },

  setup() {
    return {
      IMAGES_SLICK_ARRAY,
      DETAILED_ROOM,
    };
  },
};
</script>