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
          v-if="!checkIsXsScreen"
          v-model="dateRangeSearch"
          type="daterange"
          :start-placeholder="$t('shared.navbar.from_date')"
          :end-placeholder="$t('shared.navbar.to_date')"
          format="DD-MM-YYYY"
          class="searchbar--datepicker"
        ></el-date-picker>

        <guest-picker v-if="!checkIsXsScreen" @pick-guest="pickGuest" />

        <button class="btn btn--primary">
          <i class="el-input__icon el-icon-search btn-icon"></i>
        </button>
      </div>
    </div>

    <div v-if="checkIsMdOrAboveScreen" class="navbar--info d-flex align-items-center">
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.login")
      }}</router-link>
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.signup")
      }}</router-link>

      <setting-picker />
    </div>

    <i v-else class="el-icon-menu cursor menu-icon" @click="$emit('toggle-sidebar')"></i>
  </div>
</template>

<script>
import { ref, computed } from "vue";

import GuestPicker from "./GuestPicker.vue";
import SettingPicker from "./SettingPicker.vue";

import { isMdOrAboveScreen, isXsScreen } from '../../helpers/mediaHelpers'

export default {
  components: {
    GuestPicker,
    SettingPicker,
  },

  emits: ['toggle-sidebar'],

  setup() {
    let locationSearch = ref("");
    let dateRangeSearch = ref([]);

    function pickGuest(guestObj) {
      console.log(guestObj);
    }

    let checkIsMdOrAboveScreen = computed(() => isMdOrAboveScreen(window))
    let checkIsXsScreen = computed(() => isXsScreen(window))

    return {
      locationSearch,
      dateRangeSearch,
      pickGuest,
      checkIsMdOrAboveScreen,
      checkIsXsScreen
    };
  },
};
</script>