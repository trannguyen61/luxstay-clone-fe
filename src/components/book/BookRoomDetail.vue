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
        <strong><small>{{ dateDiff + 1 }} {{ $t("shared.night") }}</small></strong>
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

      <div class="d-flex justify-content-between mt-1" v-if="discount">
        <small class="m-0">{{ $t("pages.room.discount") }}</small>
        <small class="m-0">{{ discount }} %</small>
      </div>

      <!-- <div class="d-flex justify-content-between">
        <small class="m-0">{{ $t("pages.room.service_price") }}</small>
        <small class="m-0">{{  }}</small>
      </div> -->
    </div>

    <el-divider></el-divider>

    <div class="d-flex justify-content-between">
      <small class="m-0"><strong>{{ $t("pages.room.total") }}</strong></small>
      <small class="m-0">{{ detailPrice.totalPriceAfterDiscount }} {{ $t("shared.currency." + currency) }}</small>
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

    let discount = computed(() => store.state.payment.coupon)

    let detailPrice = computed(() => {
      if (!store.state.currentRoom.name) return {}

      const defaultDayPrice = store.state.currentRoom.schedule_price_attributes.normal_day_price
      const defaultWeekendPrice = store.state.currentRoom.schedule_price_attributes.weekend_price

      const totalDays = dateDiff.value + 1
      const workDays = getBusinessDatesCount(new Date(checkin.value), new Date(checkout.value))
      console.log(checkin.value, (new Date(checkin.value).getTime()))

      const totalPrice = workDays * defaultDayPrice + (totalDays - workDays) * defaultWeekendPrice
      const totalPriceAfterDiscount = Math.round((totalPrice - totalPrice * discount.value / 100) * 100) / 100

      console.log(totalDays, workDays, totalDays - workDays, totalPrice)

      return {
        totalDays,
        workDays,
        weekendDays: totalDays - workDays,
        totalPrice,
        totalPriceAfterDiscount
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
      detailPrice,
      discount
    };
  },
};
</script>
