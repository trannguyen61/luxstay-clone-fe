<template>
  <div class="my-booked-list">
    <el-row :gutter="20">
      <el-col :span="24" :sm="8" :md="6" :lg="4">
        <div class="input-container mb-2">
          <el-select v-model="bookType">
            <el-option
              v-for="item in bookTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <small>{{ $t("pages.user.book_type_title") }}</small>
        </div>
      </el-col>
      <el-col :span="24" :sm="12" :md="8" :lg="6">
        <div class="input-container">
          <el-date-picker
            v-model="monthRange"
            type="monthrange"
            format="MM-YYYY"
            value-format="YYYY-MM"
          />
          <el-row class="ml-1">
            <el-col :span="12">
              <small>{{ $t("pages.user.from_month") }}</small>
            </el-col>
            <el-col :span="12">
              <small>{{ $t("pages.user.to_month") }}</small>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <div class="my-booked-list--container mt-3">
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane
          :label="$t('pages.user.homestay')"
          name="first"
        ></el-tab-pane>
      </el-tabs>

      <div>
        <el-empty
          v-if="!list.length"
          :image-size="200"
          :description="$t('shared.no_data')"
        ></el-empty>
        <div v-else class="my-booked-list--list">
          <el-row :gutter="20">
            <el-col v-for="(item, i) in list" :key="i" :span="24" :md="12" >
              <booked-room-item :item="item" class="mb-2" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref, onMounted } from "vue";
import { i18n } from "@/plugins/i18n/i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import BookedRoomItem from "@/components/user/BookedRoomItem";
import bookApi from '@/api/services/bookApi.js'
import ApiHandler from '@/helpers/ApiHandler'
import ResponseHelper from '@/helpers/ResponseHelper'

export default {
  components: { BookedRoomItem },

  setup() {
    let bookType = ref("");
    let monthRange = ref([]);
    let activeName = ref("first");

    let list = ref([]);

    const handleClickTab = () => {};

    let bookTypes = computed(() => [
      {
        label: i18n.global.t("pages.user.all_book_type"),
        value: "all",
      },
      {
        label: i18n.global.t("pages.user.pending_book_type"),
        value: "pending",
      },
      {
        label: i18n.global.t("pages.user.booked_type"),
        value: "booked",
      },
    ]);

    const store = useStore();
    let userId = computed(() => store.state.user.user.id)

    const router = useRouter()

    const getBookedRoomList = async () => {
      if (!userId.value) {
        router.push({ name: "Login" })
        return
      }

      if (store.state.user.bookedList.length) {
        list.value = store.state.user.bookedList
        return
      }

      const handler = new ApiHandler()
                          .setData({id: userId.value})
                          .setOnResponse(rawData => {
                            const data = new ResponseHelper(rawData)
                            list.value = data.data
                            store.commit('changeBookedList', data.data)
                          })
                          .setOnFinally(() => {})
      
      const onRequest = async () => {
        return bookApi.getBookingByUser(handler.data)
      }

      await handler.setOnRequest(onRequest).execute()
    };

    watch(
      () => bookType,
      () => getBookedRoomList()
    );

    onMounted(() => {
      getBookedRoomList()
    })

    // TO DO: FILTER ON MONTH RANGE
    // watch(
    //   () => monthRange,
    //   () => getBookedRoomList()
    // );

    return {
      bookType,
      monthRange,
      activeName,
      list,
      handleClickTab,
      bookTypes,
    };
  },
};
</script>