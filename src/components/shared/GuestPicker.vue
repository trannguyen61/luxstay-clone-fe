<template>
  <div class="guest-picker">
    <div class="guest-picker-btn" @click="toggleDialog">
      <i class="el-icon-user mr-1"></i>
      <p class="m-0">{{ $t("shared.navbar.guest_number") }}</p>
    </div>

    <div v-show="isDialogOpened" class="guest-picker-dialog card"></div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let isDialogOpened = ref(false);

    function toggleDialog() {
      isDialogOpened.value = !isDialogOpened.value;
    }

    return {
      isDialogOpened,
      toggleDialog,
    };
  },
};
</script>