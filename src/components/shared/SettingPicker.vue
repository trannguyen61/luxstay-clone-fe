<template>
  <div
    class="setting-picker ml-2"
    :class="checkIsMdOrAboveScreen ? '' : 'setting-picker--mobile'"
  >
    <div
      class="setting-picker-btn d-flex align-items-center"
      @click="toggleDialog"
    >
      <img
        :src="require(`@/assets/images/${locale}.png`)"
        alt=""
        class="icon-img mr-1"
      />
      <b class="m-0">{{ currency }}</b>
      <i class="el-icon-arrow-down ml-1 mr-1"></i>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="isDialogOpened"
        class="guest-picker-dialog setting-picker-dialog card d-flex"
        :class="checkIsMdOrAboveScreen ? '' : 'setting-picker-dialog--mobile'"
      >
        <div class="picker-col-1">
          <div
            v-for="(lang, i) in LANGUAGES_ARR"
            :key="i"
            class="setting-picker--select cursor mb-1"
            @click="changeLanguage(lang.icon)"
          >
            <div class="d-flex align-items-center">
              <img
                :src="require(`@/assets/images/${lang.icon}.png`)"
                alt=""
                class="mr-2 icon-img"
              />
              <p class="m-0">{{ lang.name }}</p>
              <i v-if="locale == lang.icon" class="el-icon-check ml-1"></i>
            </div>
          </div>
        </div>

        <div v-if="checkIsMdOrAboveScreen" class="divider"></div>

        <div class="picker-col-2">
          <div
            v-for="(curr, i) in CURRENCIES_ARR"
            :key="i"
            class="setting-picker--select cursor d-flex align-items-center"
            :class="i != CURRENCIES_ARR.length - 1 ? 'mb-2' : ''"
            @click="changeCurrency(curr.name)"
          >
            <b class="mr-2">{{ curr.name }}</b>
            <p class="m-0">{{ curr.desc }}</p>
            <i v-if="currency == curr.name" class="el-icon-check ml-1"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import useDialog from "@/composables/useDialog.js"

import { i18n } from "@/plugins/i18n/i18n";
import { CURRENCIES_ARR } from "@/consts/billingConsts";
import { LANGUAGES_ARR } from "@/consts/sharedConsts";
import { isMdOrAboveScreen } from "@/helpers/mediaHelpers";

export default {
  setup() {
    const store = useStore();

    let currency = computed(() => store.state.currency);

    function changeCurrency(curr) {
      store.commit("changeCurrency", curr);
    }

    let { isDialogOpened, toggleDialog } = useDialog()

    let locale = computed(() => i18n.global.locale);

    function changeLanguage(lang) {
      i18n.global.locale = lang;
    }

    let checkIsMdOrAboveScreen = computed(() => isMdOrAboveScreen(window));

    return {
      currency,
      changeCurrency,
      isDialogOpened,
      toggleDialog,
      locale,
      changeLanguage,
      CURRENCIES_ARR,
      LANGUAGES_ARR,
      checkIsMdOrAboveScreen,
    };
  },
};
</script>