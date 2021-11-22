<template>
  <div class="user-page">
    <div class="container container--sm">
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane :label="$t('pages.user.my_booked_list')" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="user-page--content">
      <div class="container container--sm pt-3">
        <my-booked-list />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import MyBookedList from "@/components/user/MyBookedList";

export default {
  components: { MyBookedList },
  setup() {
    let activeName = ref("first");

    const handleClickTab = (tab, event) => {};

    return {
      activeName,
      handleClickTab,
    };
  },
};
</script>