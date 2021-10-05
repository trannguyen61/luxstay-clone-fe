<template>
  <h3>{{ $t("pages.room.price") }}</h3>
  <p>{{ $t("pages.room.price_description") }}</p>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" :label="$t('pages.room.price_date')" />
    <el-table-column prop="price" :label="$t('pages.room.price')" />
  </el-table>
</template>

<script>
import { computed } from "vue";

import { i18n } from "@/plugins/i18n/i18n";
import { convertCurrency } from "@/helpers/sharedHelpers.js";

export default {
  props: {
    price: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {

    let tableData = computed(() => [
      {
        date: i18n.global.t("pages.room.nightly_price"),
        price: convertCurrency(props.price.nightly_price, i18n.global.locale),
      },
      {
        date: i18n.global.t("pages.room.weekend_price"),
        price: convertCurrency(props.price.weekend_price, i18n.global.locale),
      },
      {
        date: i18n.global.t("pages.room.additional_guests_fee"),
        price: `${convertCurrency(
          props.price.additional_guests_fee,
          i18n.global.locale
        )} (${i18n.global.t("shared.after")} ${props.price.standard_guests} ${i18n.global.t("shared.guest_name")})`,
      },
      {
        date: i18n.global.t("pages.room.additional_children_fee"),
        price: `${convertCurrency(
          props.price.additional_children_fee,
          i18n.global.locale
        )} (${i18n.global.t("shared.after")} ${props.price.standard_children} ${i18n.global.t("shared.guest_name")})`,
      },
      {
        date: i18n.global.t("pages.room.minimum_stay"),
        price: `${props.price.minimum_stay} ${i18n.global.t("shared.night")}`,
      },
      {
        date: i18n.global.t("pages.room.maximum_stay"),
        price: `${props.price.maximum_stay} ${i18n.global.t("shared.night")}`,
      },
    ]);

    return {
      tableData,
    };
  },
};
</script>