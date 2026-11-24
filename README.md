# iso-weeks-kit

A small, dependency-free library for ISO-8601 week calculations, including the awkward year-end cases.

## Usage

```js
import {
  isoWeekYear,
  isoWeekNumber,
  isoWeekString,
  isoWeekFromDate,
} from 'iso-weeks-kit';

const date = new Date(Date.UTC(2024, 0, 1));
console.log(isoWeekYear(date));    // 2024
console.log(isoWeekNumber(date));  // 1
console.log(isoWeekString(date));  // "2024-W01"

const monday = isoWeekFromDate('2024-W01');
console.log(monday.toISOString().slice(0, 10)); // "2024-01-01"
```

## Why this exists

The ISO week-numbering year is not the calendar year. Around January 1st and December 31st, a date can belong to the previous or next ISO year, and the week number can be 52, 53, or 1. Getting this right requires the standard algorithm: weeks start on Monday, and week 1 is the week containing the first Thursday of the year.

This library implements that algorithm directly, with no dependencies, so it works in any modern JavaScript environment. The trade-off is that it only handles ISO weeks; it does not attempt to support other week-numbering systems or locales.

## Edge cases

The most common surprise is that `isoWeekYear` can differ from `getUTCFullYear()`. For example, 2023-01-01 is in ISO week 2022-W52, and 2021-01-01 is in 2020-W53. The functions here always use UTC to avoid timezone-dependent behaviour.
