<template>
  <div class="room-preview mb-5">
    <router-link to="#">
      <div class="img-wrap">
        <img :src="require('@/assets/images/hanoi.png')" alt="" />
      </div>
    </router-link>
    <div
      class="
        room-preview--info
        d-flex
        justify-content-between
        align-items-center
        mt-1
      "
    >
      <small>{{
        `${$t("shared.type." + item.type)} - ${item.bedroom} ${$t(
          "shared.bedroom"
        )}`
      }}</small>
      <div class="rating">
        <font-awesome-icon icon="star" color="#ffcd3c" />
        {{ item.rating }}
        <small>({{ item.rated_by }})</small>
      </div>
    </div>
    <router-link to="#">
      <div class="room-preview--title">{{ item.title }}</div>
    </router-link>
    <strong class="room-preview--price">
      <small
        >{{
          `${item.vnd_price}${$t("shared.currency." + currency)}/${$t(
            "shared.night"
          )}`
        }}
      </small>
    </strong>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
};
</script>