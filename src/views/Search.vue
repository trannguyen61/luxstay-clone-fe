<template>
  <div class="search container container--md">
    <div class="section-title">
      <h3 class="m-0 mb-3">{{ $t("pages.search.places") }}</h3>
    </div>

    <slick-carousel
      class="place-slick mx-auto"
      id="place-slick"
      slick-id="place-slick"
      :item-size="312"
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

    <div class="section-title mb-3">
      <el-row :gutter="10" class="d-flex align-items-center">
        <el-col :md="12">
          <h3 class="m-0">{{ $t("pages.search.homestay") }}</h3>
        </el-col>
        <el-col
          :md="12"
          class="d-flex justify-content-end"
          :class="checkIsMdOrAboveScreen ? '' : 'mt-2'"
        >
          <el-select v-model="filterOption" :placeholder="$t('shared.select')">
            <el-option
              v-for="item in FILTER_OPTIONS"
              :key="item.value"
              :label="$t(`shared.${item.label}`)"
              :value="item.value"
            >
            </el-option>

            <template #prefix>
              <p class="m-0">{{ $t("shared.filter") }}:</p>
            </template>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="row">
      <div
        v-for="item in ROOM_PREVIEW_LIST.items"
        :key="item.id"
        class="col-xs-6 col-md-3 col-lg-20"
      >
        <room-preview :item="item" :currency="currency" />
      </div>
    </div>

    <div class="grid-center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="PAGINATION_SIZE"
        :total="ROOM_PREVIEW_LIST.total"
        class="d-inline-block"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import SlickCarousel from "@/components/shared/SlickCarousel.vue";
import RoomPreview from "@/components/search/RoomPreview.vue";

import { INTERESTING_PLACES } from "@/consts/mediaConsts.js";
import { FILTER_OPTIONS, PAGINATION_SIZE } from "@/consts/sharedConsts.js";
import {
  isMdOrAboveScreen,
  isLgOrAboveScreen,
  isSmOrAboveScreen,
} from "@/helpers/mediaHelpers.js";

import { ROOM_PREVIEW_LIST } from "@/test/testData.js";

export default {
  name: "Search",

  components: { SlickCarousel, RoomPreview },

  setup() {
    const store = useStore();

    let currency = computed(() => store.state.currency);

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

    let filterOption = ref("");

    return {
      currency,
      placeSlickItemNumber,
      checkIsMdOrAboveScreen,
      filterOption,
      INTERESTING_PLACES,
      FILTER_OPTIONS,
      ROOM_PREVIEW_LIST,
      PAGINATION_SIZE,
    };
  },
};
</script>