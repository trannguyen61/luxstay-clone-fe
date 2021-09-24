<template>
  <div class="slick d-flex align-items-center">
    <button
      class="arrow-btn arrow-btn--left cursor"
      :disabled="isReachedHead"
      @click="prev"
    >
      <i class="el-icon-arrow-left"></i>
    </button>
    <div class="items-container">
      <div class="slick--items d-flex align-items-center">
        <slot></slot>
      </div>
    </div>
    <button
      class="arrow-btn arrow-btn--right cursor"
      :disabled="isReachedTail"
      @click="next"
    >
      <i class="el-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  props: {
    itemSize: {
      type: Number,
      required: true,
    },
    itemNumber: {
      type: Number,
      required: true,
    },
    totalItemNumber: {
      type: Number,
      required: true,
    },
    slickId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    let xPosition = ref(0);

    const totalSlickItemsLength = props.totalItemNumber * props.itemSize;
    const totalOnScreenItemsLength = props.itemNumber * props.itemSize;

    onMounted(() => {
      const slick = document.getElementById(`${props.slickId}`);
      slick.style.width = `${props.itemSize * props.itemNumber}px`;
    });

    let isReachedHead = computed(() => xPosition.value >= 0);
    let isReachedTail = computed(
      () =>
        Math.abs(xPosition.value) >=
        totalSlickItemsLength - totalOnScreenItemsLength
    );

    function prev() {
      const slickItems = document
        .getElementById(`${props.slickId}`)
        .getElementsByClassName("slick--items")[0];
      xPosition.value += props.itemSize;
      slickItems.style.transform = `translateX(${xPosition.value}px)`;
    }

    function next() {
      const slickItems = document
        .getElementById(`${props.slickId}`)
        .getElementsByClassName("slick--items")[0];
      xPosition.value -= props.itemSize;
      slickItems.style.transform = `translateX(${xPosition.value}px)`;
    }

    return {
      isReachedHead,
      isReachedTail,
      prev,
      next,
    };
  },
};
</script>