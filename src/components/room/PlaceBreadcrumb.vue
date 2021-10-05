<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in items" :key="item.id" :to="{ path: item.url }">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
}
</script>