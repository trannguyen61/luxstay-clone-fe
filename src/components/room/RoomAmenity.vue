<template>
  <h3>{{ $t("pages.room.amenity") }}</h3>
  <p>{{ $t("pages.room.amenity_description") }}</p>

  <!-- <template v-for="input in amenityTypes" :key="input.id">
    <h4>{{ input.name }}</h4>
    <el-row>
      <el-col v-for="fac in input.amenities.data" :key="fac.id" :span="12" :md="8" class="mb-1">
        <font-awesome-icon icon="angle-right" class="mr-1" />
        <span>{{ fac.name }}</span>
      </el-col>
    </el-row>
  </template> -->

  <el-row>
    <el-col v-for="fac in amenity" :key="fac.id" :span="12" :md="8" class="mb-1">
      <font-awesome-icon icon="angle-right" class="mr-1" />
      <span>{{ fac }}</span>
    </el-col>
  </el-row>
</template>

<script>
// import { computed } from "vue";

// import { AMENITY_TYPES_ID } from "@/consts/sharedConsts";

export default {
  props: {
    amenity: {
      type: Array,
      default: () => [],
    },
    amenityTypes: {
      type: Array,
      default: () => []
    }
  },

  // setup({ amenity }) {
  //   const facilities = computed(() =>
  //     amenity.filter((e) => e.type.data.id == AMENITY_TYPES_ID.facility)
  //   );
  //   const kitchen = computed(() =>
  //     amenity.filter((e) => e.type.data.id == AMENITY_TYPES_ID.kitchen)
  //   );
  //   const entertainment = computed(() =>
  //     amenity.filter((e) => e.type.data.id == AMENITY_TYPES_ID.entertainment)
  //   );
  //   const general = computed(() =>
  //     amenity.filter((e) => e.type.data.id == AMENITY_TYPES_ID.general)
  //   );

  //   const inputs = computed(() => {
  //     return [
  //       {
  //         id: 1,
  //         name: "facility",
  //         value: facilities.value,
  //       },
  //       {
  //         id: 2,
  //         name: "kitchen",
  //         value: kitchen.value,
  //       },
  //       {
  //         id: 3,
  //         name: "entertainment",
  //         value: entertainment.value,
  //       },
  //       {
  //         id: 4,
  //         name: "general",
  //         value: general.value,
  //       },
  //     ];
  //   });

  //   return {
  //     inputs,
  //   };
  // },
};
</script>