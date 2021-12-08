<template>
  <div class="booked-room-item">
    <!-- <div
      :class="
        item.status == 'done'
          ? 'booked-room-item--status'
          : 'booked-room-item--status booked-room-item--status__not-done'
      "
    >
      {{ $t(`shared.${item.status}`) }}
    </div> -->
    <div class="booked-room-item--date">
      {{ convertDate(item.checkin, 'T') }} - {{ convertDate(item.checkout, 'T') }}
    </div>
    <div class="booked-room-item--description mt-2">
      <router-link :to="{ name: 'Room', query: { id: item.place_id } }" class="link link--highlight">{{
        item.place_name
      }}</router-link>
      <p class="mt-1">{{ $t("shared.type." + item.place_type) }}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="booked-room-item--price">{{ $t("shared.total_price") }}: {{ item.price }}</div>
      <!-- <el-button
        v-if="item.status == 'pending'"
        round
        class="el-button--active"
      >
        {{ $t("pages.user.pay") }}
      </el-button> -->
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/helpers/sharedHelpers"

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup() {
    return {
      convertDate
    }
  }
};
</script>