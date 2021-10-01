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
      @choose-filters="getPlaces"
    ></checkbox-filter>
    <checkbox-filter
      :array="ROOM_TYPES"
      type="type"
      @choose-filters="getTypes"
    ></checkbox-filter>
    <price-filter :currency="currency" @choose-filters="getPriceRange"></price-filter>
    <general-filter @choose-filters="getGeneralFilters"></general-filter>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import { DETAIL_FILTER_OPTIONS } from "@/consts/sharedConsts.js";

import CheckboxFilter from "@/components/search/CheckboxFilter.vue";
import PriceFilter from "@/components/search/PriceFilter.vue"
import GeneralFilter from "@/components/search/GeneralFilter.vue"

import { HANOI_DISTRICTS, ROOM_TYPES } from "@/test/testData.js";

export default {
  components: { CheckboxFilter, PriceFilter, GeneralFilter },

  setup() {
    const store = useStore();

    let currency = computed(() => store.state.currency);

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

    let priceRange = ref([]);

    function getPriceRange(array) {
      priceRange.value = array;
    }

    let generalFilterOptions = ref({});

    function getGeneralFilters(object) {
      generalFilterOptions.value = object;
    }

    return {
      currency,
      inputs,
      getPlaces,
      getTypes,
      getPriceRange,
      getGeneralFilters,
      DETAIL_FILTER_OPTIONS,
      HANOI_DISTRICTS,
      ROOM_TYPES,
    };
  },
};
</script>