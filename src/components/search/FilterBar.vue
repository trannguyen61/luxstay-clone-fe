<template>
  <div class="filter-bar container--md">
    <el-checkbox-button
      v-for="option in DETAIL_FILTER_OPTIONS"
      :key="option.label"
      v-model="inputs[option.value].value"
      :label="$t(`shared.options.${option.label}`)"
      class="ml-1 mr-1"
    ></el-checkbox-button>

    <checkbox-filter
      :array="HANOI_DISTRICTS"
      type="place"
      @choose-filter="getPlaces"
    ></checkbox-filter>
    <checkbox-filter
      :array="ROOM_TYPES"
      type="type"
      @choose-filter="getTypes"
    ></checkbox-filter>
  </div>
</template>

<script>
import { ref } from "vue";
import { DETAIL_FILTER_OPTIONS } from "@/consts/sharedConsts.js";

import CheckboxFilter from "@/components/search/CheckboxFilter.vue";

import { HANOI_DISTRICTS, ROOM_TYPES } from "@/test/testData.js";

export default {
  components: { CheckboxFilter },

  setup() {
    let easy_cancel = ref(false);
    let quick_book = ref(false);
    let shocking_price = ref(false);

    const inputs = {
      easy_cancel: easy_cancel,
      quick_book: quick_book,
      shocking_price: shocking_price,
    };

    let places = ref([]);

    function getPlaces(array) {
      places.value = array;
    }

    let types = ref([]);

    function getTypes(array) {
      types.value = array;
    }

    return {
      inputs,
      getPlaces,
      getTypes,
      DETAIL_FILTER_OPTIONS,
      HANOI_DISTRICTS,
      ROOM_TYPES,
    };
  },
};
</script>