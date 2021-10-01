<template>
  <el-popover
    placement="bottom"
    :width="200"
    trigger="click"
    popper-class="custom-popover"
    @hide="done"
  >
    <template #reference>
      <el-button :class="checkList.length > 0 ? 'el-button--active' : ''">
        {{ title }}
        <font-awesome-icon
          v-if="checkList.length > 0"
          class="ml-1"
          icon="times-circle"
          color="white"
          @click="cancel"
        />
      </el-button>
    </template>
    <div class="filter-dialog">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in array" :key="item.name" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <button class="text-btn" @click="cancel">
        {{ $t("shared.cancel") }}
      </button>
      <button class="text-btn text-btn--highlight" @click="done">
        {{ $t("shared.done") }}
      </button>
    </div>
  </el-popover>
</template>

<script>
import { ref, computed } from "vue";

import { getFilterButtonTitle } from "@/helpers/sharedHelpers.js";

export default {
  props: {
    array: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  emits: ["choose-filters"],

  setup(props, context) {
    let checkList = ref([]);

    function cancel() {
      checkList.value = [];
    }
    function done() {
      context.emit("choose-filters", checkList.value);
    }

    let title = computed(() => {
      const firstChosen =
        checkList.value.length > 0
          ? props.array.find((e) => e.id == checkList.value[0]).name
          : "";
      return getFilterButtonTitle(props.type, checkList.value, firstChosen);
    });

    return {
      checkList,
      title,
      cancel,
      done,
    };
  },
};
</script>