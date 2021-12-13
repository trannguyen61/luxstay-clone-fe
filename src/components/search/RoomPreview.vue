<template>
  <div class="room-preview mb-5">
    <router-link :to="{ name: 'Room', query: { id: item.id } }">
      <div class="img-wrap">
        <img :src="`${item.image}`" alt="" />
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
        `${$t("shared.type." + item.place_type)} - ${item.room_attributes.num_of_bedroom} ${$t(
          "shared.bedroom"
        )}`
      }}</small>
      <div class="rating" v-if="item.ratings.length">
        <font-awesome-icon icon="star" color="#ffcd3c" />
        {{ item.rating }}
        <small>({{ item.rated_by }})</small>
      </div>
    </div>
    <router-link to="#">
      <div class="room-preview--title">{{ item.name }}</div>
    </router-link>
    <div>
      <small>{{ item.address }}</small>
    </div>
    <strong class="room-preview--price">
      <small
        >{{
          `${item.schedule_price_attributes.normal_day_price}${$t("shared.currency." + item.policy_attributes.currency)}/${$t(
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
      default: 'usd',
    },
  },
};
</script>