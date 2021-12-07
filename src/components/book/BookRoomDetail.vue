<template>
  <h3 class="mb-5">{{ $t("pages.book.book_detail") }}</h3>

  <div class="card book-room-card">
    <div class="d-flex justify-content-between">
      <div>
        <h4 class="mb-1">{{ name }}</h4>
        <span>
          <font-awesome-icon icon="map-marker-alt" class="mr-1" />
          <strong><small>{{ address }}</small></strong>
        </span>
      </div>
      <div>
        <img :src="featuredPhoto" alt="" class="featured-photo">
      </div>
    </div>

    <el-divider></el-divider>

    <div>
      <span>
        <strong><small>{{ dateDiff }} {{ $t("shared.night") }}</small></strong>
        <span> ・ </span>
        <small class="m-0">{{ convertDate(checkin) }} - {{ convertDate(checkout) }}</small>
      </span>
      <el-divider></el-divider>
      <span>
        <strong><small class="m-0 mb-1">{{ grownupGuests }} {{ $t("shared.grownup") }}</small></strong><br>
        <strong><small class="m-0 mb-1">{{ kidGuests }} {{ $t("shared.kid") }}</small></strong><br>
        <strong><small class="m-0 mb-1">{{ babyGuests }} {{ $t("shared.baby") }}</small></strong>
      </span>
    </div>

    <el-divider></el-divider>

    <div>
      <div class="d-flex justify-content-between">
        <small class="m-0">{{ $t("pages.room.price_a_night") }} {{ dateDiff + 1 }} {{ $t("shared.night") }}</small>
        <small class="m-0">{{ detailPrice.totalPrice }} {{ $t("shared.currency." + currency) }}</small>
      </div>

      <!-- <div class="d-flex justify-content-between">
        <small class="m-0">{{ $t("pages.room.service_price") }}</small>
        <small class="m-0">{{  }}</small>
      </div> -->
    </div>

    <el-divider></el-divider>

    <div class="d-flex justify-content-between">
      <small class="m-0"><strong>{{ $t("pages.room.total") }}</strong></small>
      <small class="m-0">{{ detailPrice.totalPrice }} {{ $t("shared.currency." + currency) }}</small>
    </div>

    <el-divider></el-divider>

    <div>
      <strong><small class="mb-1">{{ $t("pages.room.cancel_rules") }}</small></strong><br>
      <small class="m-0">{{ $t("pages.room.repay_rules_description") }}</small>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import useBookRouteQuery from "@/composables/useBookRouteQuery";

import { convertDate, getBusinessDatesCount } from "@/helpers/sharedHelpers"

export default {
  setup() {
    const store = useStore();
    // const currentRoom = computed(() => store.state.currentRoom)
    const name = computed(() => store.state.currentRoom.name);
    const address = computed(() => store.state.currentRoom.address);
    const currency = computed(() => {
      if (store.state.currentRoom.name) return store.state.currentRoom.policy_attributes.currency
      else return 'usd'
    })

    const featuredPhoto = computed(() => store.state.currentRoom.image)

    let {
      totalGuestsText,
      checkin,
      checkout,
      dateDiff,
      grownupGuests,
      kidGuests,
      babyGuests,
      roomId
    } = useBookRouteQuery();

    let detailPrice = computed(() => {
      if (!store.state.currentRoom.name) return {}

      console.log(store.state.currentRoom)
      const defaultDayPrice = store.state.currentRoom.schedule_price_attributes.normal_day_price
      const defaultWeekendPrice = store.state.currentRoom.schedule_price_attributes.weekend_price

      const totalDays = dateDiff.value
      const workDays = getBusinessDatesCount(new Date(checkin), new Date(checkout))
      console.log(totalDays, workDays, defaultDayPrice, defaultWeekendPrice)
      return {
        totalDays,
        workDays,
        weekendDays: totalDays - workDays,
        totalPrice: workDays * defaultDayPrice + (totalDays - workDays) * defaultWeekendPrice
      }
    })

    return {
      name,
      address,
      currency,
      featuredPhoto,
      totalGuestsText,
      checkin,
      checkout,
      dateDiff,
      grownupGuests,
      kidGuests,
      babyGuests,
      convertDate,
      detailPrice
    };
  },
};
</script>
