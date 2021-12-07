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

export function getGuestPickerButtonTitle(guestNumber) {
  return guestNumber > 0
    ? `${guestNumber} ${i18n.global.t("shared.guest_name")}`
    : i18n.global.t("shared.navbar.guest_number");
}

export function convertCurrency(price, locale) {
  if (locale == "vi") {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  } else if (locale == "en") {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}

export function convertDate(date, format = "YYYY-mm-dd") {
  if (format == 'T') {
    date = date.split('T')[0]
  } 
  const splittedDate = date.split("-")
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`  
}

export function getBusinessDatesCount(startDate, endDate) {
  let count = 0;
  let curDate = new Date(startDate.getTime());
  while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
  }
  return count;
}