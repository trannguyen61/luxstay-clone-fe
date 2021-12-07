<template>
  <div class="book-page">
    <el-row :gutter="20" class="container container--sm mx-auto">
      <el-col :span="24" :md="12">
        <book-room-input :bookRoom="bookRoom"></book-room-input>
      </el-col>
      <el-col :md="2" :lg="4"></el-col>
      <el-col :span="24" :md="10" :lg="8">
        <book-room-detail></book-room-detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import BookRoomInput from "@/components/book/BookRoomInput";
import BookRoomDetail from "@/components/book/BookRoomDetail";

import bookApi from '@/api/services/bookApi.js'
import placeApi from '@/api/services/placeApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'
import { ElNotification } from "element-plus";

export default {
  components: { BookRoomInput, BookRoomDetail },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let currentRoom = computed(() => store.state.currentRoom)
    let roomId = computed(() => route.query.roomId)

    onMounted(() => {
      console.log(currentRoom.value);
      if (!currentRoom.value.name && !roomId.value) {
        router.push({
          name: "Home",
        });
      } else if (roomId.value && !currentRoom.value.name) {
        onGetPlaceById()
      }
    });

    async function onGetPlaceById() {
      const handler = new ApiHandler()
                          .setData({id: roomId.value})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            store.commit("changeCurrentRoom", data.data)
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return placeApi.getPlaceById(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    async function bookRoom(reqBody) {
      const handler = new ApiHandler()
                          .setData(reqBody)
                          .setOnResponse(rawData => {
                            ElNotification({
                              title: "Booked successfully!",
                              message: "Please check your booked list",
                              type: "success",
                            });

                            router.push({
                              name: "Home",
                            });
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return bookApi.postNewBooking(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    }

    return {
      bookRoom
    }
  },
};
</script>