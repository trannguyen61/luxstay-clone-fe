<template>
  <div class="d-flex align-items-center justify-content-between">
    <h1>{{ room.name }}</h1>
    <div class="room-page--host">
      <router-link to="/">
        <i class="el-icon-user"></i>
      </router-link>
    </div>
  </div>
  <div class="d-flex align-items-center mb-1">
    <font-awesome-icon icon="map-marker-alt" class="mr-1" />
    <strong>{{ address }}</strong>
    <router-link to="/" class="link link--highlight ml-1">{{
      $t("pages.room.go_to_map")
    }}</router-link>
  </div>
  <div class="d-flex align-items-center mb-1">
    <font-awesome-icon icon="building" class="mr-1" />
    <strong>{{ $t("pages.room.other") }}</strong>
    <p class="m-0 ml-1">{{ room.area }} m<sup>2</sup></p>
  </div>
  <p class="room-page--general-description">
    {{ room.roomType.data.name }} - {{ room.num_bedrooms }}
    {{ $t("shared.bedrooms") }} - {{ room.num_beds }} {{ $t("shared.beds") }} -
    {{ room.num_bathrooms }} {{ $t("shared.bathrooms") }} -
    {{ $t("shared.maximum") }} {{ room.maximum_guests }}
    {{ $t("shared.guest_name") }}
  </p>
  <div class="hideable-text" id="hideable-text">
    <div class="hideable-text--text" v-html="room.introduction"></div>
    <div class="hideable-text--toggle">
      <button class="text-btn text-btn--highlight" @click="showText">
        {{ isTextShown ? $t("shared.collapse") : $t("shared.read_more") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const address = computed(() => {
      const addObj = props.room.address.data;
      return `${addObj.city}, ${addObj.state}, ${addObj.country}`;
    });

    const isTextShown = ref(false);

    function showText() {
      isTextShown.value = !isTextShown.value;
      const hideableText = document.getElementById("hideable-text");
      if (isTextShown.value) {
        hideableText.classList.add("hideable-text--shown");
      } else {
        hideableText.classList.remove("hideable-text--shown");
      }
    }

    return {
      address,
      isTextShown,
      showText,
    };
  },
};
</script>