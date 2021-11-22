<template>
  <div class="booked-room-item">
    <div
      :class="
        item.status == 'done'
          ? 'booked-room-item--status'
          : 'booked-room-item--status booked-room-item--status__not-done'
      "
    >
      {{ $t(`shared.${item.status}`) }}
    </div>
    <div class="booked-room-item--date">
      {{ item.from_date }} - {{ item.to_date }}
    </div>
    <div class="booked-room-item--description mt-2">
      <router-link to="#" class="link link--highlight">{{
        item.room
      }}</router-link>
      <p class="mt-1">{{ item.address }}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="booked-room-item--price">{{ item.price }}</div>
      <el-button
        v-if="item.status == 'pending'"
        round
        class="el-button--active"
      >
        {{ $t("pages.user.pay") }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>