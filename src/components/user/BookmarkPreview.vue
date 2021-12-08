<template>
  <div class="room-preview bookmark-preview mb-5">
    <router-link :to="{ name: 'Room', query: { id: item.place_id } }">
      <div class="img-wrap">
        <img :src="`${item.place_image}`" alt="" />
      </div>
    </router-link>

    <router-link :to="{ name: 'Room', query: { id: item.place_id } }">
      <div class="room-preview--title mt-1">{{ item.place_name }}</div>
    </router-link>
    <div>
      <small>
        {{ item.place_address }}
      </small>
    </div>
    <strong class="room-preview--price">
      <small
        >{{
          `${item.place_price} ${$t("shared.currency." + currency)}/${$t(
            "shared.night"
          )}`
        }}
      </small>
    </strong>
    <el-button class="mt-2" round @click="removeBookmark(item.place_id)">
      {{ $t("shared.rmv_bookmark") }}
      <font-awesome-icon icon="heart" class="ml-1" />
    </el-button>
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
      default: "usd",
    },
    removeBookmark: {
      type: Function,
      default: () => {},
    },
  },
};
</script>