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
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

import MyBookedList from "@/components/user/MyBookedList";
import MyBookmark from "@/components/user/MyBookmark"
import { ElNotification } from "element-plus";

export default {
  components: { MyBookedList, MyBookmark },
  setup() {
    const route = useRoute()

    let activeName = ref("first");

    const handleClickTab = (tab, event) => {};

    const store = useStore();
    let isLoggedIn = computed(() => store.getters.isLoggedIn)

    const router = useRouter()

    function redirectUnauthorizedUser() {
      if (!isLoggedIn.value) {
        ElNotification({
          title: "Oops!",
          message: "You must log in first",
          type: "warning",
        });

        router.push({ name: "Home" })
      }
    }

    watch(() => isLoggedIn.value, () => {
      redirectUnauthorizedUser()
    })
    
    onMounted(() => {
      redirectUnauthorizedUser()

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