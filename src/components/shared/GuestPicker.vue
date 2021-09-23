<template>
  <div class="guest-picker">
    <div class="guest-picker-btn" @click="toggleDialog">
      <i class="el-icon-user mr-1"></i>
      <p class="m-0">{{ $t("shared.navbar.guest_number") }}</p>
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
import { ref, computed } from "vue";

export default {
  emits: ["pick-guest"],

  setup(_, { emit }) {
    let isDialogOpened = ref(false);

    function toggleDialog() {
      isDialogOpened.value = !isDialogOpened.value;
    }

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

    return {
      isDialogOpened,
      toggleDialog,
      grownupGuests,
      kidGuests,
      babyGuests,
      inputs,
      cancel,
      done,
    };
  },
};
</script>