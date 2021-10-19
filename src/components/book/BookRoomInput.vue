<template>
  <div class="mb-5">
    <h3 class="mb-5">{{ $t("pages.book.book_info") }}</h3>

    <div class="mb-4">
      <label class="required mb-2">{{ $t("pages.book.guest_number") }}</label>
      <el-input
        v-model="totalGuestsText"
        placeholder="Guest number"
        readonly
        class="mt-2"
      />
    </div>

    <div class="mb-4">
      <label class="mb-2"
        >{{ dateDiff }} {{ $t("pages.book.night_at") }}
        {{ currentRoomName }}</label
      >
      <div class="d-flex mt-2">
        <el-card class="box-card w-50 mr-3">
          <hr class="decor-line decor-line--green" />
          <p class="mb-1">{{ $t("pages.book.checkin") }}</p>
          <h3 class="mt-1">{{ checkin }}</h3>
          <small>{{}}</small>
        </el-card>

        <el-card class="box-card w-50">
          <hr class="decor-line decor-line--yellow" />
          <p class="mb-1">{{ $t("pages.book.checkout") }}</p>
          <h3 class="mt-1">{{ checkout }}</h3>
          <small>{{}}</small>
        </el-card>
      </div>
    </div>

    <div class="mb-4">
      <label class="mb-2">{{ $t("pages.book.responsibility") }}</label>
      <p>{{ $t("pages.book.all_responsibility") }}</p>
    </div>

    <div class="mb-4">
      <label class="mb-2">{{ $t("pages.book.rules") }}</label>
      <p>{{ $t("pages.book.making_noise_rule") }}</p>
    </div>
  </div>

  <div class="mb-5">
    <h3 class="mb-5">{{ $t("pages.book.guest_info") }}</h3>

    <div class="mb-4">
      <label class="required mb-2">{{ $t("pages.book.guest_name") }}</label>
      <div>
        <small>{{ $t("pages.book.name_on_card") }}</small>
      </div>
      <el-input v-model="guestName" class="mt-2" />
    </div>

    <div class="input-group d-flex align-items-center mb-4">
      <div class="mr-3 w-50">
        <label class="required mb-2">{{ $t("pages.book.guest_phone") }}</label>
        <div class="mb-2">
          <small>{{ $t("pages.book.phone_code") }}</small>
        </div>
        <el-input
          v-model="phoneNumber.number"
          placeholder="Phone number"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="phoneNumber.code"
              placeholder="+84"
              style="width: 110px"
            >
              <el-option
                v-for="item in COUNTRY_PHONE_CODE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-input>
      </div>

      <div class="w-50">
        <label class="required mb-2">{{ $t("pages.book.email") }}</label>
        <div>
          <small>{{ $t("pages.book.example") }}: abc@example.com</small>
        </div>
        <el-input v-model="email" class="mt-2" />
      </div>
    </div>

    <div class="mb-2">
      <label class="required mb-2">{{ $t("pages.book.country") }}</label>
      <div class="mb-2">
        <small>{{ $t("pages.book.country_notice") }}</small>
      </div>
      <el-select v-model="country" placeholder="Select">
        <el-option
          v-for="item in COUNTRIES"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-button class="el-button--active mt-3">
      {{ $t("pages.room.book_now") }}
    </el-button>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";

import useBookRouteQuery from "@/composables/useBookRouteQuery";

import { COUNTRIES, COUNTRY_PHONE_CODE } from "@/consts/sharedConsts";

export default {
  setup() {
    const store = useStore();

    let guestName = ref("");
    let phoneNumber = reactive({
      code: "+84",
      number: "",
    });
    let email = ref("");
    let country = ref("");

    let {
      totalGuestsText,
      checkin,
      checkout,
      dateDiff,
      grownupGuests,
      kidGuests,
      babyGuests,
    } = useBookRouteQuery();

    let currentRoomName = store.state.currentRoom.name;

    return {
      guestName,
      phoneNumber,
      email,
      country,
      currentRoomName,
      totalGuestsText,
      checkin,
      checkout,
      dateDiff,
      grownupGuests,
      kidGuests,
      babyGuests,
      COUNTRIES,
      COUNTRY_PHONE_CODE,
    };
  },
};
</script>