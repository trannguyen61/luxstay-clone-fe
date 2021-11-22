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
          <booked-room-item v-for="(item, i) in list" :key="i" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { i18n } from "@/plugins/i18n/i18n";

import { BOOKED_ROOM } from "@/test/testData";

import BookedRoomItem from "@/components/user/BookedRoomItem";

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

    const getBookedRoomList = () => {};

    watch(
      () => bookType,
      () => getBookedRoomList()
    );
    watch(
      () => monthRange,
      () => getBookedRoomList()
    );

    // Change this on applying api
    list.value = BOOKED_ROOM;

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