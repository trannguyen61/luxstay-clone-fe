<template>
  <el-popover
    placement="bottom"
    :width="600"
    trigger="click"
    popper-class="custom-popover"
  >
    <template #reference>
      <el-button :class="choseFilters ? 'el-button--active' : ''">
        {{ $t("shared.options.more_filters") }}
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
      <div>
        <h3>{{ $t("shared.options.rooms_and_beds") }}</h3>

        <div class="d-flex justify-content-between">
          <p>{{ $t("shared.options.bed") }}</p>
          <el-input-number v-model="bedNumber" :min="0" :max="10" />
        </div>

        <div class="d-flex justify-content-between">
          <p>{{ $t("shared.options.bedroom") }}</p>
          <el-input-number v-model="bedroomNumber" :min="0" :max="10" />
        </div>

        <div class="d-flex justify-content-between">
          <p>{{ $t("shared.options.bathroom") }}</p>
          <el-input-number v-model="bathroomNumber" :min="0" :max="10" />
        </div>
      </div>

      <div v-for="filter in DETAIL_GENERAL_FILTER_OPTIONS" :key="filter.name">
        <h3>{{ $t(`shared.options.${filter.name}`) }}</h3>

        <el-checkbox-group v-model="inputs[filter.name].value">
          <el-row>
            <el-col :span="12" v-for="item in filter.items" :key="item.id">
              <el-checkbox :label="item.name">{{
                $t(`shared.options.${item.name}`)
              }}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
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

import { DETAIL_GENERAL_FILTER_OPTIONS } from "@/consts/sharedConsts.js";

export default {
  emits: ["choose-filters"],

  setup(_, context) {
    let bedNumber = ref(0);
    let bedroomNumber = ref(0);
    let bathroomNumber = ref(0);

    let serviceList = ref([]);
    let shoppingList = ref([]);
    let inputs = {
      service: serviceList,
      shopping: shoppingList,
    };

    function cancel() {
      bedNumber.value = 0;
      bedroomNumber.value = 0;
      bathroomNumber.value = 0;
      serviceList.value = [];
      shoppingList.value = [];

      done()
    }
    function done() {
      context.emit("choose-filters", {
        bedNumber: bedNumber.value,
        bedroomNumber: bedroomNumber.value,
        bathroomNumber: bathroomNumber.value,
        serviceList: serviceList.value,
        shoppingList: shoppingList.value,
      });
    }

    let choseFilters = computed(() => {
      return (
        bedNumber.value != 0 ||
        bedroomNumber.value != 0 ||
        bathroomNumber.value != 0 ||
        serviceList.value.length != 0 ||
        shoppingList.value.length != 0
      );
    });

    return {
      choseFilters,
      bedNumber,
      bedroomNumber,
      bathroomNumber,
      cancel,
      done,
      inputs,
      DETAIL_GENERAL_FILTER_OPTIONS,
    };
  },
};
</script>