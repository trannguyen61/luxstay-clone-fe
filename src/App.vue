<template>
  <div class="app">
    <header>
      <div class="navbar-container">
        <div class="container container--md wmd-100-wmd-90 header">
          <nav-bar @toggleSidebar="toggleSidebar" />
        </div>
      </div>
      <side-bar :isOpened="isSidebarOpened" @toggleSidebar="toggleSidebar" />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref } from "vue";

import NavBar from "./components/shared/NavBar.vue";
import SideBar from "./components/shared/SideBar.vue";

export default {
  components: {
    NavBar,
    SideBar,
  },

  setup() {
    let isSidebarOpened = ref(false);

    function toggleSidebar() {
      isSidebarOpened.value = !isSidebarOpened.value;
    }

    return {
      isSidebarOpened,
      toggleSidebar,
    };
  },
};
</script>
