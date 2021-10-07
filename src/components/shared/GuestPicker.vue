<template>
  <div class="guest-picker">
    <div class="guest-picker-btn" @click="toggleDialog">
      <i class="el-icon-user mr-1"></i>
      <p class="m-0">{{ title }}</p>
    </div>

    <transition name="slide-fade" mode="out-in">
      <div v-if="isDialogOpened" class="guest-picker-dialog card">
        <div
          v-for="input in inputs"
          :key="input.name"
          class="
            guest-picker-dialog--input
            d-flex
            justify-content-between
            align-items-center
          "
        >
          <div class="guest-picker-dialog--label mr-3">
            <p class="m-0">{{ $t(`shared.navbar.${input.name}`) }}</p>
            <small v-if="input.warning" class="text-small">{{
              $t(`shared.navbar.${input.warning}`)
            }}</small>
          </div>

          <el-input-number v-model="input.model.value" :min="0" :max="99" />
        </div>

        <div class="d-flex justify-content-between mt-3">
          <button class="text-btn" @click="cancel">
            {{ $t("shared.cancel") }}
          </button>
          <button class="text-btn text-btn--highlight" @click="done">
            {{ $t("shared.done") }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import useDialog from "@/composables/useDialog.js";

import { getGuestPickerButtonTitle } from "@/helpers/sharedHelpers.js";

export default {
  emits: ["pick-guest"],

  props: {
    defaultGuests: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props, { emit }) {
    let { isDialogOpened, toggleDialog } = useDialog();

    let grownupGuests = ref(0);
    let kidGuests = ref(0);
    let babyGuests = ref(0);

    const totalGuests = computed(
      () => grownupGuests.value + kidGuests.value + babyGuests.value
    );

    const inputs = [
      {
        name: "grownup",
        model: grownupGuests,
      },
      {
        name: "kid",
        model: kidGuests,
        warning: "kid_warning",
      },
      {
        name: "baby",
        model: babyGuests,
        warning: "baby_warning",
      },
    ];

    function cancel() {
      grownupGuests.value = 0;
      kidGuests.value = 0;
      babyGuests.value = 0;

      isDialogOpened.value = false;
    }

    function done() {
      emit("pick-guest", {
        grownupGuests: grownupGuests.value,
        kidGuests: kidGuests.value,
        babyGuests: babyGuests.value,
        totalGuests: totalGuests.value,
      });

      isDialogOpened.value = false;
    }

    let title = computed(() => getGuestPickerButtonTitle(totalGuests.value));

    function getDefaultInput() {
      if (props.defaultGuests.grownupGuests) {
        grownupGuests.value = props.defaultGuests.grownupGuests
      }

      if (props.defaultGuests.kidGuests) {
        kidGuests.value = props.defaultGuests.kidGuests
      }

      if (props.defaultGuests.babyGuests) {
        babyGuests.value = props.defaultGuests.babyGuests
      }
    }

    watch(() => props.defaultGuests, () => getDefaultInput())

    onMounted(() => getDefaultInput())

    return {
      isDialogOpened,
      toggleDialog,
      grownupGuests,
      kidGuests,
      babyGuests,
      inputs,
      cancel,
      done,
      title,
    };
  },
};
</script>