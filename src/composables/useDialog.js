import { ref } from "vue";

export default function() {
    let isDialogOpened = ref(false);

    function toggleDialog() {
      isDialogOpened.value = !isDialogOpened.value;
    }

    return {
        isDialogOpened,
        toggleDialog
    }
}