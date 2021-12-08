<template>
  <div class="card book-room-card">
    <div class="book-room-card--price">
      <h1 class="d-inline mr-1">
        {{ defaultPrice.normal_day_price }} {{ $t("shared.currency." + currency) }}
      </h1>
      <p class="d-inline">/1 {{ $t("shared.night") }}</p>
    </div>

    <el-date-picker
      v-model="dateRangeSearch"
      type="daterange"
      :start-placeholder="$t('shared.navbar.from_date')"
      :end-placeholder="$t('shared.navbar.to_date')"
      format="DD-MM-YYYY"
      value-format="YYYY-MM-DD"
      class="searchbar--datepicker mt-2 mb-2"
    ></el-date-picker>

    <div class="navbar">
      <guest-picker :defaultGuests="guestSearch" @pick-guest="pickGuest" />
    </div>

    <template v-if="detailPrice">
      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.normal_day_price") }}</span>
        <span>{{ defaultPrice.normal_day_price }} {{ $t("shared.currency." + currency) }}</span>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.num_of_workday") }}</span>
        <span>{{ detailPrice.workDays }} {{ $t("shared.night") }}</span>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.weekend_price") }}</span>
        <span>{{ defaultPrice.weekend_price }} {{ $t("shared.currency." + currency) }}</span>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.num_of_weekend") }}</span>
        <span>{{ detailPrice.weekendDays }} {{ $t("shared.night") }}</span>
      </div>

      <!-- <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.service_price") }}</span>
        <span>{{ convertCurrency(detail.serviceFee, locale) }}</span>
      </div> -->

      <el-divider></el-divider>

      <div class="d-flex align-items-center justify-content-between">
        <span
          ><strong>{{ $t("pages.room.total") }}</strong></span
        >
        <span
          ><strong>{{ detailPrice.totalPrice }} {{ $t("shared.currency." + currency) }}</strong></span
        >
      </div>
    </template>

    <el-button
      class="el-button--active mt-3 w-100"
      :disabled="notHasAllPropertiesToBook"
      @click="bookRoom"
    >
      {{ $t("pages.room.book_now") }}
    </el-button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import GuestPicker from "@/components/shared/GuestPicker";

import { i18n } from "@/plugins/i18n/i18n";
import { convertCurrency, getBusinessDatesCount } from "@/helpers/sharedHelpers.js";
import { ElNotification } from "element-plus";

export default {
  props: {
    defaultPrice: {
      type: Object,
      default: () => ({}),
    },
    defaultInput: {
      type: Object,
      default: () => ({}),
    },
    roomId: {
      type: [String, Number],
      default: ""
    },
    currency: {
      type: String,
      default: 'usd'
    }
  },

  emits: ["book-room"],

  components: { GuestPicker },

  setup(props, context) {
    let dateRangeSearch = ref([]);
    let guestSearch = ref({});

    function getDefaultInput() {
      if (props.defaultInput.checkin && props.defaultInput.checkout) {
        dateRangeSearch.value = [
          props.defaultInput.checkin,
          props.defaultInput.checkout,
        ];
      }

      if (
        props.defaultInput.grownupGuests ||
        props.defaultInput.kidGuests ||
        props.defaultInput.babyGuests
      ) {
        guestSearch.value = {
          grownupGuests: parseInt(props.defaultInput.grownupGuests),
          kidGuests: parseInt(props.defaultInput.kidGuests),
          babyGuests: parseInt(props.defaultInput.babyGuests),
        };
      }
    }

    function pickGuest(guestObj) {
      guestSearch.value = guestObj;
    }

    let detailPrice = computed(() => {
      if (dateRangeSearch.value.length != 2) return false

      const defaultDayPrice = props.defaultPrice.normal_day_price
      const defaultWeekendPrice = props.defaultPrice.weekend_price

      const totalDays = Math.floor(
        (new Date(dateRangeSearch.value[1]) - new Date(dateRangeSearch.value[0])) /
          (1000*60*60*24)
      ) + 1
      const workDays = getBusinessDatesCount(new Date(dateRangeSearch.value[0]), new Date(dateRangeSearch.value[1]))
      console.log(totalDays, workDays, defaultDayPrice, defaultWeekendPrice)
      return {
        totalDays,
        workDays,
        weekendDays: totalDays - workDays,
        totalPrice: workDays * defaultDayPrice + (totalDays - workDays) * defaultWeekendPrice
      }
    })

    onMounted(() => getDefaultInput());

    const router = useRouter();

    const store = useStore()

    let isLoggedIn = computed(() => store.getters.isLoggedIn)

    function bookRoom() {
      if (!isLoggedIn.value) {
        if (localStorage.getItem('token') != "") store.commit('changeToken', localStorage.getItem('token'))

        ElNotification({
          title: "Please log in first",
          message: "",
          type: "error",
        });

        return
      }

      context.emit("book-room");

      const searchQuery = {
        roomId: props.roomId,
        checkin: dateRangeSearch.value[0],
        checkout: dateRangeSearch.value[1],
        ...guestSearch.value,
      };

      router.push({
        name: "Book",
        query: searchQuery,
      });
    }

    let notHasAllPropertiesToBook = computed(() => {
      if (dateRangeSearch.value.length == 0 || !guestSearch.value.totalGuests || !props.roomId) {
        return true;
      }
      return false;
    });

    return {
      dateRangeSearch,
      guestSearch,
      pickGuest,
      detailPrice,
      locale: i18n.global.locale,
      convertCurrency,
      bookRoom,
      notHasAllPropertiesToBook,
    };
  },
};
</script>