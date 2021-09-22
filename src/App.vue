<template>
  <el-container>
    <el-header>
    <nav-bar/>      
    </el-header>
    <el-main>
    <router-view />
    </el-main>
  </el-container>
</template>

<script>
import NavBar from './components/shared/NavBar.vue'

export default {
  components: {
    NavBar
  },

  setup() {
    
  },
}
</script>
