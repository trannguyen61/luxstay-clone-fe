<template>
  <div class="card book-room-card">
    <div class="book-room-card--price">
      <h1 class="d-inline mr-1">
        {{ convertCurrency(defaultPrice.nightly_price, locale) }}
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

    <template v-if="detail.roomId">
      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.price_a_night") }}</span>
        <span>{{ convertCurrency(detail.totalBasePricePlain, locale) }}</span>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-2">
        <span>{{ $t("pages.room.service_price") }}</span>
        <span>{{ convertCurrency(detail.serviceFee, locale) }}</span>
      </div>

      <el-divider></el-divider>

      <div class="d-flex align-items-center justify-content-between">
        <span
          ><strong>{{ $t("pages.room.total") }}</strong></span
        >
        <span
          ><strong>{{ convertCurrency(detail.total, locale) }}</strong></span
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

import GuestPicker from "@/components/shared/GuestPicker";

import { i18n } from "@/plugins/i18n/i18n";
import { convertCurrency } from "@/helpers/sharedHelpers.js";

export default {
  props: {
    defaultPrice: {
      type: Object,
      default: () => ({}),
    },
    detail: {
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

    onMounted(() => getDefaultInput());

    const router = useRouter();

    function bookRoom() {
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
      locale: i18n.global.locale,
      convertCurrency,
      bookRoom,
      notHasAllPropertiesToBook,
    };
  },
};
</script>