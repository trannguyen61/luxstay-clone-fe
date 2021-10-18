<template>
  <h3 class="mb-5">{{ $t("pages.book.book_detail") }}</h3>

  <div class="card book-room-card">
    <div class="d-flex align-items-center justify-content-between">
      <div>
        <h4>{{ name }}</h4>
        <span>
          <font-awesome-icon icon="map-marker-alt" class="mr-1" />
          <strong>{{ address }}</strong>
        </span>
      </div>
    </div>

    <el-divider></el-divider>

    <div></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const name = computed(() => store.state.currentRoom.name);
    const address = computed(() => {
      console.log(store.state.currentRoom);
      const addObj = store.state.currentRoom.address.data;
      return `${addObj.city}, ${addObj.state}, ${addObj.country}`;
    });

    return {
      name,
      address,
    };
  },
};
</script>
