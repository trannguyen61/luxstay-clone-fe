import { i18n } from "@/plugins/i18n/i18n";

export function getFilterButtonTitle(
  type = "place",
  array = [],
  firstChosen = ""
) {
  const arrayLength = array.length;
  if (arrayLength == 1) {
    return firstChosen;
  } else if (arrayLength > 1) {
    return arrayLength + " " + i18n.global.t(`shared.options.${type}`);
  }
  return i18n.global.t(`shared.options.${type}`);
}

export function getPriceFilterButtonTitle(array, currency) {
  return array[0] > 0 || array[1] < 50000000
    ? `${currency} ${array[0]} - ${array[1]}`
    : i18n.global.t(`shared.options.price`);
}
