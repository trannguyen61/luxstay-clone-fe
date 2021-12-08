<template>
  <div class="user-page">
    <div class="container container--sm">
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane :label="$t('pages.user.my_booked_list')" name="first"></el-tab-pane>
        <el-tab-pane :label="$t('shared.bookmark')" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="user-page--content">
      <div class="container container--sm pt-3">
        <my-booked-list v-if="activeName == 'first'" />
        <my-bookmark v-if="activeName == 'second'" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'

import MyBookedList from "@/components/user/MyBookedList";
import MyBookmark from "@/components/user/MyBookmark"

export default {
  components: { MyBookedList, MyBookmark },
  setup() {
    const route = useRoute()

    let activeName = ref("first");

    const handleClickTab = (tab, event) => {};
    
    onMounted(() => {
      if (route.query.tab == 'bookmark') {
        activeName.value = 'second'
      }
    })

    return {
      activeName,
      handleClickTab,
    };
  },
};
</script>