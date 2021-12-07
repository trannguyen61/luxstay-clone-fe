<template>
  <h3>{{ $t("pages.room.review") }}</h3>

  <div class="room-page--review mt-2" v-for="review in reviews" :key="review.id">
    <div class="d-flex align-items-center mb-2">
      <div class="room-page--host">
        <i class="el-icon-user"></i>
      </div>
      <div class="ml-2">
        <div class="d-flex align-items-center">
          <h5 class="m-0">{{ review.user_name }}</h5>

          <div class="rating ml-2">
            <font-awesome-icon icon="star" color="#ffcd3c" />
            {{ review.score }}
          </div>
        </div>
        <!-- <small>{{ convertDate(review.created_at, 'T') }}</small> -->
      </div>
    </div>
    <div>
      <p class="m-0">{{ review.comment }}</p>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/helpers/sharedHelpers"

export default {
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
      return {
          convertDate
      }
  }
};
</script>
