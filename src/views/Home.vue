<template>
  <div class="home container container--sm mt-3">
    <el-carousel v-if="checkIsMdOrAboveScreen">
      <el-carousel-item v-for="(filename, i) in BANNER_FILENAMES" :key="i">
        <img
          :src="require(`@/assets/images/${filename}`)"
          alt=""
          class="banner"
        />
      </el-carousel-item>
    </el-carousel>

    <div class="section-title">
      <h2 class="m-0 mb-3">{{ $t("pages.home.greetings") }}</h2>
      <p class="m-0 mb-2">{{ $t("pages.home.greetings_info_1") }}</p>
      <p class="m-0">
        <router-link class="link text-bold" to="#">{{
          $t("shared.login")
        }}</router-link>
        {{ $t("shared.or") }}
        <router-link class="link text-bold" to="#">{{
          $t("shared.signup")
        }}</router-link>
        {{ $t("pages.home.greetings_info_2") }}
      </p>
    </div>

    <div class="section-title">
      <h2 class="m-0 mb-3">{{ $t("pages.home.places") }}</h2>
      <p class="m-0">{{ $t("pages.home.places_info") }}</p>
    </div>

    <slick-carousel
      class="place-slick mx-auto"
      id="place-slick"
      slick-id="place-slick"
      :item-size="270"
      :item-number="placeSlickItemNumber"
      :total-item-number="INTERESTING_PLACES.length"
    >
      <router-link
        v-for="item in INTERESTING_PLACES"
        :key="item.name"
        to="#"
        class="place-link"
      >
        <div class="p-relative h-100">
          <img
            :src="require(`@/assets/images/${item.img}`)"
            alt=""
            class="place-link--img"
          />
          <div class="place--title">{{ $t(`places.${item.name}`) }}</div>
        </div>
      </router-link>
    </slick-carousel>
  </div>
</template>

<script>
import { computed } from "vue";

// @ is an alias to /src
import SlickCarousel from "@/components/shared/SlickCarousel.vue";

import { BANNER_FILENAMES, INTERESTING_PLACES } from "@/consts/mediaConsts.js";
import {
  isMdOrAboveScreen,
  isLgOrAboveScreen,
  isSmOrAboveScreen,
} from "@/helpers/mediaHelpers.js";

export default {
  name: "Home",

  components: { SlickCarousel },

  setup() {
    let placeSlickItemNumber = computed(() => {
      if (isLgOrAboveScreen(window)) {
        return 5;
      } else if (isMdOrAboveScreen(window)) {
        return 3;
      } else if (isSmOrAboveScreen(window)) {
        return 2;
      } else {
        return 1;
      }
    });

    let checkIsMdOrAboveScreen = computed(() => isMdOrAboveScreen(window));

    return {
      placeSlickItemNumber,
      checkIsMdOrAboveScreen,
      BANNER_FILENAMES,
      INTERESTING_PLACES,
    };
  },
};
</script>
