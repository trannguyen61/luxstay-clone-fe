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
          format="DD-MM-YYYY"
          class="searchbar--datepicker"
        ></el-date-picker>

        <guest-picker @pick-guest="pickGuest" />

        <button class="btn btn--primary">
          <i class="el-input__icon el-icon-search btn-icon"></i>
        </button>
      </div>
    </div>
    <div class="navbar--info d-flex align-items-center">
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.login")
      }}</router-link>
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.signup")
      }}</router-link>

      <setting-picker />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import GuestPicker from "./GuestPicker.vue";
import SettingPicker from "./SettingPicker.vue";

export default {
  components: {
    GuestPicker,
    SettingPicker,
  },

  setup() {
    let locationSearch = ref("");
    let dateRangeSearch = ref([]);

    function pickGuest(guestObj) {
      console.log(guestObj);
    }

    return {
      locationSearch,
      dateRangeSearch,
      pickGuest,
    };
  },
};
</script>