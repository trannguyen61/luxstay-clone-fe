<template>
  <div class="filter-bar container--md">
    <!-- <el-checkbox-button
      v-for="option in DETAIL_FILTER_OPTIONS"
      :key="option.label"
      v-model="inputs[option.value].value"
      :label="$t(`shared.options.${option.label}`)"
      class="ml-1 mr-1"
    ></el-checkbox-button> -->

    <!-- <checkbox-filter
      :array="HANOI_DISTRICTS"
      type="place"
      @choose-filters="getPlaces"
    ></checkbox-filter> -->
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

// import CheckboxFilter from "@/components/search/CheckboxFilter.vue";
import PriceFilter from "@/components/search/PriceFilter.vue"
import GeneralFilter from "@/components/search/GeneralFilter.vue"

import { ROOM_TYPES } from "@/test/testData.js";

import placeApi from '@/api/services/placeApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'

export default {
  components: { PriceFilter, GeneralFilter },

  setup(_, context) {
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

      getFilter()
    }

    let generalFilterOptions = ref({});

    function getGeneralFilters(object) {
      generalFilterOptions.value = object;

      getFilter()
    }

    async function getFilter() {
      const params = {
        ...(priceRange.value.length == 2
          ? {
              min_price: priceRange.value[0],
              max_price: priceRange.value[1],
            }
          : {}),
        ...(generalFilterOptions.value.bedNumber ? { num_of_bed: generalFilterOptions.value.bedNumber} : {}),
        ...(generalFilterOptions.value.bedroomNumber ? { num_of_bedroom: generalFilterOptions.value.bedroomNumber} : {}),
        ...(generalFilterOptions.value.bathroomNumber ? { num_of_bathroom: generalFilterOptions.value.bathroomNumber} : {}),
      }

      if (!Object.keys(params).length) return

      const handler = new ApiHandler()
                          .setData({params})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            context.emit('update-list', data.data)
                          })
                          .setOnFinally(() => {})

      const onRequest = async () => {
        return placeApi.getFilter(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    return {
      currency,
      inputs,
      getPlaces,
      getTypes,
      getPriceRange,
      getGeneralFilters,
      DETAIL_FILTER_OPTIONS,
      // HANOI_DISTRICTS,
      ROOM_TYPES,
    };
  },
};
</script>