<template>
  <div class="navbar">
    <div class="navbar--search">
      <div class="navbar--logo"></div>
      <div class="searchbar">
        <el-input
          v-model="locationSearch"
          :placeholder="$t('shared.navbar.search')"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </el-input>
        <div class="divider" />
        <el-date-picker
          v-model="dateRangeSearch"
          type="daterange"
          :start-placeholder="$t('shared.navbar.from_date')"
          :end-placeholder="$t('shared.navbar.to_date')"
          :locale="i18n.locale"
          class="searchbar--datepicker"
        ></el-date-picker>

        <guest-picker @pick-guest="pickGuest" />

        <button class="btn btn--primary">
          <i class="el-input__icon el-icon-search btn-icon"></i>
        </button>
      </div>
    </div>
    <div class="navbar--info">
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.login")
      }}</router-link>
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.signup")
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { i18n } from "../../plugins/i18n/i18n";

import GuestPicker from "./GuestPicker.vue";

export default {
  components: {
    GuestPicker,
  },

  setup() {
    let locationSearch = ref("");
    let dateRangeSearch = ref([]);

    function pickGuest(guestObj) {
      console.log(guestObj)
    }

    return {
      i18n,
      locationSearch,
      dateRangeSearch,
      pickGuest
    };
  },
};
</script>