/*
 *
 * Переопределяем datepicker.conf.js
 * т.к. в грузинском языке нету заглавных букв
 * v8 неправильно возводит грузинский текст в верхний регистр
 * 'იანვარი'.toUpperCase() => "ᲘᲐᲜᲕᲐᲠᲘ"
 * Решение:
 * в pikaday.setConfig если установлен грузинский язык, не вызываем для месяца функцию capitalize
 *
 */
var momentLang = o2context.lang;

if (momentLang === "hy") {
  momentLang = "hy-am";
}

angular.module("app").config([
  "pikadayConfigProvider",
  function(pikaday) {
    var ld = moment.localeData(momentLang);

    if (!ld) {
      ld = moment.localeData("en");
    }
    if (momentLang === "ru") {
      moment.updateLocale("ru", {
        monthsShort: {
          format: "янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек".split(
            "_"
          ),
          standalone: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split(
            "_"
          )
        }
      });
    }

    pikaday.setConfig({
      format: "DD.MM.YYYY",
      i18n: {
        previousMonth: "Previous Month",
        nextMonth: "Next Month",
        /* eslint-disable */
        months: (ld._months.standalone || ld._months).map(
          momentLang === "ka" ? returnItem : capitalize
        ),
        weekdays: (ld._weekdays.standalone || ld._weekdays).map(
          momentLang === "ka" ? returnItem : capitalize
        ),
        weekdaysShort: (ld._weekdaysShort.standalone || ld._weekdaysShort).map(
          momentLang === "ka" ? returnItem : capitalize
        )
        /* eslint-enable */
      },
      firstDay: 1
    });

    function returnItem(item) {
      return item;
    }

    function capitalize(string) {
      string = String(string).toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
]);
