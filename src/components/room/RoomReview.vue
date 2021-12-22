<template>
  <h3>{{ $t("pages.room.review") }}</h3>

  <div class="room-page--create-a-review mt-2" v-if="ableToWriteAReview">
    <span class="demonstration">{{ $t("pages.room.write_your_review") }}</span>
    <el-rate v-model="inputRating" class="mt-2 mb-2"></el-rate>
    <el-input
      v-model="inputComment"
      :rows="2"
      type="textarea"
      placeholder=""
      class="mb-2"
    />
    <el-button
      round
      class="el-button--active mt-2"
      @click="postNewRating"
    >
      {{ $t("pages.room.post_review") }}
    </el-button>

    <el-divider></el-divider>
  </div>

  <template v-if="reviews.length">
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
  <div class="room-page--review mt-2" v-else>
    <p class="m-0">{{ $t("shared.no_review") }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from "vuex";
import { convertDate } from "@/helpers/sharedHelpers"

import bookApi from '@/api/services/bookApi.js'
import placeApi from '@/api/services/placeApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'

import { ElNotification } from "element-plus";

export default {
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
    roomId: {
      type: [String, Number],
      default: ""
    },
  },

  setup(props) {
    let inputRating = ref(0)
    let inputComment = ref("")

    const store = useStore()
    let bookedList = computed(() => store.state.user.bookedList)
    let userId = computed(() => store.state.user.user.id)
    let isLoggedIn = computed(() => store.getters.isLoggedIn)

    let hasFetchedBookedList = ref(false)

    let ableToWriteAReview = computed(() => {
      if (!hasFetchedBookedList.value && !bookedList.value.length && isLoggedIn.value) {
        getBookedRoomList()
        return
      }

      return isLoggedIn.value && bookedList.value.map(e => e.place_id).includes(props.roomId)
    })

    watch(() => isLoggedIn, () => {
      getBookedRoomList()
    })

    onMounted(() => {
      if (!hasFetchedBookedList.value && !bookedList.value.length && isLoggedIn.value) {
        getBookedRoomList()
      }
    })

    const getBookedRoomList = async () => {
      const handler = new ApiHandler()
                          .setData({id: userId.value})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            store.commit('changeBookedList', data.data)
                            hasFetchedBookedList.value = true
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return bookApi.getBookingByUser(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    };

    const postNewRating = async () => {
      if (!inputRating.value || inputComment.value == '') return
      const reqBody = {
        score: inputRating.value,
        comment: inputComment.value
      }

      const handler = new ApiHandler()
                          .setData({id: props.roomId, reqBody})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            
                            if (data.isSuccess()) {
                              ElNotification({
                                title: "Posted comment successfully!",
                                message: "Thanks for your feedback.",
                                type: "success",
                              });

                              inputComment.value = ''
                              inputRating.value = 0
                            } else {
                              ElNotification({
                                title: "Oh no! There's an error posting your comment",
                                message: "Please try again",
                                type: "error",
                              });
                            }
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.postNewRating(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    };

    return {
      convertDate,
      inputRating,
      inputComment,
      ableToWriteAReview,
      postNewRating
    }
  }
};
</script>
