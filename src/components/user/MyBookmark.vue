<template>
  <div v-loading="loadBookmark">
    <div class="row" v-if="list.length">
      <div
        v-for="item in list"
        :key="item.id"
        class="col-xs-6 col-md-3 col-lg-20"
      >
        <bookmark-preview :item="item" :removeBookmark="onDeleteBookmark" />
      </div>
    </div>
    <el-empty
      v-else
      :image-size="200"
      :description="$t('shared.no_data')"
    ></el-empty>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import placeApi from "@/api/services/placeApi.js";
import ApiHandler from "@/helpers/ApiHandler";
import ResponseHelper from "@/helpers/ResponseHelper";

import BookmarkPreview from "@/components/user/BookmarkPreview.vue";

import { ElNotification } from "element-plus";

export default {
  components: { BookmarkPreview },

  setup() {
    let list = ref([]);

    let loadBookmark = ref(false)

    const getUserBookmark = async () => {
      loadBookmark.value = true

      const handler = new ApiHandler()
        .setOnResponse((rawData) => {
          const data = new ResponseHelper(rawData);
          list.value = data.data;
        })
        .setOnFinally(() => {
          loadBookmark.value = false
        });

      const onRequest = async () => {
        return placeApi.getUserBookmark();
      };

      await handler.setOnRequest(onRequest).execute();
    };

    onMounted(() => {
      getUserBookmark();
    });

    async function onDeleteBookmark(roomId) {
      const reqBody = {
        place_id: roomId,
      };

      const handler = new ApiHandler()
        .setData(reqBody)
        .setOnResponse((rawData) => {
          const data = new ResponseHelper(rawData);
          if (data.isError()) {
            ElNotification({
              title: "Oh no! There's an error removing bookmark",
              message: data.error,
              type: "error",
            });
          } else {
            getUserBookmark();
            ElNotification({
              title: "Successfully!",
              message: "Bookmark has been removed",
              type: "success",
            });
          }
        })
        .setOnFinally(() => {});

      const onRequest = async () => {
        return placeApi.deleteBookmark(handler.data);
      };

      await handler.setOnRequest(onRequest).execute();
    }

    return {
      list,
      onDeleteBookmark,
      loadBookmark
    };
  },
};
</script>