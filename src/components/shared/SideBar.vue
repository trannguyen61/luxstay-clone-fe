<template>
  <transition name="fade" mode="out-in">
    <div v-if="isOpened" class="mask" @click="$emit('toggle-sidebar')"></div>
  </transition>
  <transition name="slide-right" mode="out-in">
    <div v-if="isOpened" class="sidebar">
      <i
        class="el-icon-close mb-3 cursor menu-icon"
        @click="$emit('toggle-sidebar')"
      ></i>
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.login")
      }}</router-link>
      <router-link class="link text-bold navbar--link" to="#">{{
        $t("shared.signup")
      }}</router-link>

      <logged-member-picker class="mb-2" />
      <setting-picker />
    </div>
  </transition>
</template>

<script>
import LoggedMemberPicker from '@/components/shared/LoggedMemberPicker'
import SettingPicker from "./SettingPicker.vue";

export default {
  components: { SettingPicker, LoggedMemberPicker },
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-sidebar"],

  setup(props) {
    console.log(props.isOpened);
  },
};
</script>