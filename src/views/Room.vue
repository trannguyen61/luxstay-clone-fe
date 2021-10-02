<template>
  <div class="room-page">
    <slick-slider :height="400" :imgArray="IMAGES_SLICK_ARRAY" slickId="room-slick" id="room-slick"></slick-slider>
  </div>
</template>

<script>
import SlickSlider from "@/components/room/SlickSlider.vue"

import { IMAGES_SLICK_ARRAY } from "@/test/testData.js"

export default {
    components: { SlickSlider },

    setup() {
        return {
            IMAGES_SLICK_ARRAY
        }
    }
}
</script>