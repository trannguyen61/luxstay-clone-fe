<template>
  <el-container>
    <el-header>
    <nav-bar @toggleSidebar="toggleSidebar"/>      
    <side-bar :isOpened="isSidebarOpened" @toggleSidebar="toggleSidebar" />
    </el-header>
    <el-main>
    <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { ref } from 'vue'

import NavBar from './components/shared/NavBar.vue'
import SideBar from './components/shared/SideBar.vue'

export default {
  components: {
    NavBar,
    SideBar
  },

  setup() {
    let isSidebarOpened = ref(false);

    function toggleSidebar() {
      isSidebarOpened.value = !isSidebarOpened.value
    }

    return {
      isSidebarOpened,
      toggleSidebar
    }
  },
}
</script>
