import { computed } from "vue";
import { i18n } from "@/plugins/i18n/i18n";
import { useRoute } from "vue-router";

export default function () {
  const route = useRoute();

  let totalGuestsText = computed(
    () => `${route.query.totalGuests} ${i18n.global.t("shared.guest_name")}`
  );
  let grownupGuests = computed(() => route.query.grownupGuests);
  let kidGuests = computed(() => route.query.kidGuests);
  let babyGuests = computed(() => route.query.babyGuests);
  let checkin = computed(() => route.query.checkin);
  let checkout = computed(() => route.query.checkout);
  let roomId = computed(() => route.query.roomId)

  let dateDiff = computed(() =>
    Math.floor(
      (new Date(checkout.value) - new Date(checkin.value)) /
        (1000*60*60*24)
    )
  );

  return {
    totalGuestsText,
    checkin,
    checkout,
    dateDiff,
    grownupGuests,
    kidGuests,
    babyGuests,
    roomId
  };
}
