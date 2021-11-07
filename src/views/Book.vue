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
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import BookRoomInput from "@/components/book/BookRoomInput";
import BookRoomDetail from "@/components/book/BookRoomDetail";

export default {
  components: { BookRoomInput, BookRoomDetail },

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      console.log(store.state.currentRoom);
      if (!store.state.currentRoom.name) {
        router.push({
          name: "Home",
        });
      }
    });

    function bookRoom() {
    }

    return {
      bookRoom
    }
  },
};
</script>