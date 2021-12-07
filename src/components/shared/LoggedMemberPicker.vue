<template>
  <div
    class="setting-picker logged-member-picker ml-2"
    :class="checkIsMdOrAboveScreen ? '' : 'setting-picker--mobile'"
  >
    <div
      class="setting-picker-btn d-flex align-items-center"
      @click="toggleDialog"
    >
      <b class="m-0">{{ "Tran Nguyen" }}</b>
      <i class="el-icon-arrow-down ml-1 mr-1"></i>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="isDialogOpened"
        class="guest-picker-dialog setting-picker-dialog card d-flex"
        :class="checkIsMdOrAboveScreen ? '' : 'setting-picker-dialog--mobile'"
      >
        <ul>
          <li v-for="(item, i) in items" :key="i">
            <router-link
              :to="item.link"
              class="logged-member-picker--item d-flex align-items-center"
            >
              <font-awesome-icon :icon="item.icon" class="mr-1" />
              <p class="m-0">{{ item.title }}</p>
            </router-link>
          </li>
          <li>
            <div
              class="logged-member-picker--item d-flex align-items-center"
              @click="signout"
            >
              <font-awesome-icon icon="power-off" class="mr-1" />
              <p class="m-0">{{ $t("shared.signout") }}</p>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import useDialog from "@/composables/useDialog.js";
import { i18n } from "@/plugins/i18n/i18n";
import { isMdOrAboveScreen } from "@/helpers/mediaHelpers";

export default {
  setup() {
    const items = [
      {
        link: "#",
        icon: "calendar",
        title: i18n.global.t("shared.my_book"),
      },
    ];
    let { isDialogOpened, toggleDialog } = useDialog();

    let checkIsMdOrAboveScreen = computed(() => isMdOrAboveScreen(window));

    const store = useStore()
    const signout = () => {
      store.commit('changeToken', '')
    };

    return {
      items,
      isDialogOpened,
      toggleDialog,
      checkIsMdOrAboveScreen,
      signout,
    };
  },
};
</script>