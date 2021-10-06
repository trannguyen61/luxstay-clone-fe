<template>
  <h3>{{ $t("pages.room.availability") }}</h3>
  <p>{{ $t("pages.room.availability_description") }}</p>

  <el-calendar>
    <template #dateCell="{ data }">
      <p class="m-0">
        {{ data.day.split('-')[2] }}
      </p>
      <el-tag v-if="getPrice(data.day)" type="success">{{ getPrice(data.day) }}</el-tag>
    </template>
  </el-calendar>
</template>

<script>
export default {
  props: {
    avai: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    function getCurrentDateStatus(date) {
      const formattedDate = date.split('-')
      return props.avai.find((obj) => obj.day == formattedDate[2] && obj.month == formattedDate[1] && obj.year == formattedDate[0]);
    }

    function getPrice(date) {
        const obj = getCurrentDateStatus(date)
        return obj ? obj.price : null
    }

    return {
      getCurrentDateStatus,
      getPrice
    };
  },
};
</script>

<style>
</style>