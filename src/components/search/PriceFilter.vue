<template>
  <el-popover
    placement="bottom"
    :width="400"
    trigger="click"
    popper-class="custom-popover"
  >
    <template #reference>
      <el-button :class="choseFilters ? 'el-button--active' : ''">
        {{ title }}
        <font-awesome-icon
          v-if="choseFilters"
          class="ml-1"
          icon="times-circle"
          color="white"
          @click="cancel"
        />
      </el-button>
    </template>
    <div class="filter-dialog">
      <h4>{{ $t("shared.options.price_a_night") }}</h4>
      <el-slider
        class="price-slider"
        v-model="priceRange"
        range
        :max="100"
        :step="5"
      />
      <div class="d-flex align-items-center">
        <div class="price-change">
          <small>{{ $t("shared.options.min_price") }}</small>
          <p class="mt-1 mb-1">{{ `${currency} ${priceRange[0]}` }}</p>
        </div>
        <div class="price-change">
          <small>{{ $t("shared.options.max_price") }}</small>
          <p class="mt-1 mb-1">{{ `${currency} ${priceRange[1]}` }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <button class="text-btn" @click="cancel">
        {{ $t("shared.cancel") }}
      </button>
      <button class="text-btn text-btn--highlight" @click="done">
        {{ $t("shared.done") }}
      </button>
    </div>
  </el-popover>
</template>

<script>
import { ref, computed } from "vue";

import { getPriceFilterButtonTitle } from "@/helpers/sharedHelpers.js";

export default {
  props: {
    currency: {
      type: String,
      required: true,
    },
  },

  emits: ["choose-filters"],

  setup(props, context) {
    let priceRange = ref([0, 100]);

    function cancel() {
      priceRange.value = [0, 100];

      done()
    }
    function done() {
      console.log(priceRange.value, '---- range')
      context.emit("choose-filters", priceRange.value);
    }

    let choseFilters = computed(
      () => priceRange.value[0] > 0 || priceRange.value[1] < 100
    );

    let title = computed(() => {
      return getPriceFilterButtonTitle(priceRange.value, props.currency);
    });

    return {
      choseFilters,
      priceRange,
      title,
      cancel,
      done,
    };
  },
};
</script>