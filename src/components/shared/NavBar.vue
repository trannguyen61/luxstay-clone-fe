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
        <div v-if="!checkIsXsScreen" class="divider" />
        <el-date-picker
          v-if="!checkIsXsScreen"
          v-model="dateRangeSearch"
          type="daterange"
          :start-placeholder="$t('shared.navbar.from_date')"
          :end-placeholder="$t('shared.navbar.to_date')"
          format="DD-MM-YYYY"
          value-format="YYYY-MM-DD"
          class="searchbar--datepicker"
        ></el-date-picker>

        <guest-picker v-if="!checkIsXsScreen" @pick-guest="pickGuest" />

        <button class="btn btn--primary" @click="search">
          <i class="el-input__icon el-icon-search btn-icon"></i>
        </button>
      </div>
    </div>

    <div
      v-if="checkIsMdOrAboveScreen"
      class="navbar--info d-flex align-items-center"
    >
      <template v-if="!isLoggedIn">
        <router-link class="link text-bold navbar--link" :to="{ name: 'Login' }">{{
          $t("shared.login")
        }}</router-link>
        <router-link class="link text-bold navbar--link" :to="{ name: 'Signup' }">{{
          $t("shared.signup")
        }}</router-link>
      </template>

      <logged-member-picker v-else />
      <setting-picker />
    </div>

    <i
      v-else
      class="el-icon-menu cursor menu-icon"
      @click="$emit('toggle-sidebar')"
    ></i>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import GuestPicker from "./GuestPicker.vue";
import SettingPicker from "./SettingPicker.vue";
import LoggedMemberPicker from "@/components/shared/LoggedMemberPicker";

import { isMdOrAboveScreen, isXsScreen } from "@/helpers/mediaHelpers";

export default {
  components: {
    GuestPicker,
    SettingPicker,
    LoggedMemberPicker,
  },

  emits: ["toggle-sidebar"],

  setup() {
    let locationSearch = ref("");
    let dateRangeSearch = ref([]);
    let guestSearch = ref({});

    function pickGuest(guestObj) {
      guestSearch.value = guestObj;
    }

    let checkIsMdOrAboveScreen = computed(() => isMdOrAboveScreen(window));
    let checkIsXsScreen = computed(() => isXsScreen(window));

    const router = useRouter();

    function search() {
      const searchQuery = {
        ...(locationSearch.value ? { l: locationSearch.value } : {}),
        ...(dateRangeSearch.value
          ? {
              checkin: dateRangeSearch.value[0],
              checkout: dateRangeSearch.value[1],
            }
          : {}),
        ...(guestSearch.value ? guestSearch.value : {}),
      };

      router.push({
        name: "Search",
        query: searchQuery,
      });
    }

    const store = useStore()

    let isLoggedIn = computed(() => store.getters.isLoggedIn)
    let user = computed(() => store.state.user.user)

    onMounted(() => {
      console.log(isLoggedIn.value, user.value, localStorage.getItem('token'), localStorage.getItem('user'))
      if (!isLoggedIn.value && localStorage.getItem('token') != "") {
        store.commit('changeToken', localStorage.getItem('token'))
      }

      if (!user.value.id && localStorage.getItem('user') != "") {
        store.commit('changeUser', JSON.parse(localStorage.getItem('user')))
      }
      console.log(isLoggedIn.value, user.value, localStorage.getItem('token'), localStorage.getItem('user'))
    })

    return {
      locationSearch,
      dateRangeSearch,
      pickGuest,
      checkIsMdOrAboveScreen,
      checkIsXsScreen,
      search,
      isLoggedIn
    };
  },
};
</script>