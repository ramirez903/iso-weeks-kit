/**
 * ISO-8601 week utilities.
 *
 * The ISO week-numbering year can differ from the calendar year around
 * January 1st and December 31st. This module implements the standard
 * algorithm: weeks start on Monday, week 1 is the week containing the
 * first Thursday of the year.
 */

/**
 * Returns the ISO week-numbering year for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekYear(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  return d.getUTCFullYear();
}

/**
 * Returns the ISO week number (1-53) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekNumber(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return week;
}

/**
 * Returns the Monday of the ISO week containing the given date.
 * @param {Date} date
 * @returns {Date}
 */
export function isoWeekStart(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  return d;
}

/**
 * Returns the Sunday of the ISO week containing the given date.
 * @param {Date} date
 * @returns {Date}
 */
export function isoWeekEnd(date) {
  const start = isoWeekStart(date);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return end;
}

/**
 * Returns a string in the format YYYY-Www (e.g., "2024-W01").
 * @param {Date} date
 * @returns {string}
 */
export function isoWeekString(date) {
  const year = isoWeekYear(date);
  const week = isoWeekNumber(date);
  return `${year}-W${String(week).padStart(2, '0')}`;
}

/**
 * Parses an ISO week string (YYYY-Www) and returns the Monday of that week as a Date.
 * Throws if the input is not a valid ISO week string.
 * @param {string} str
 * @returns {Date}
 */
export function isoWeekFromDate(str) {
  const match = /^(\d{4})-W(\d{2})$/.exec(str);
  if (!match) {
    throw new Error(`Invalid ISO week string: ${str}`);
  }
  const year = parseInt(match[1], 10);
  const week = parseInt(match[2], 10);
  if (week < 1 || week > 53) {
    throw new Error(`Invalid ISO week number: ${week}`);
  }
  // ISO week 1 is the week containing the first Thursday.
  // Find the first Thursday of the given year.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7;
  const firstThursday = new Date(jan4);
  firstThursday.setUTCDate(jan4.getUTCDate() - jan4Day + 4);
  const week1Monday = new Date(firstThursday);
  week1Monday.setUTCDate(firstThursday.getUTCDate() - 3);
  const result = new Date(week1Monday);
  result.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7);
  return result;
}

/**
 * Returns an array of dates (Monday to Sunday) for the ISO week containing the given date.
 * @param {Date} date
 * @returns {Date[]}
 */
export function isoWeekRange(date) {
  const start = isoWeekStart(date);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    days.push(d);
  }
  return days;
}

/**
 * Returns the ISO weekday number (1 = Monday, 7 = Sunday) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDay(date) {
  return date.getUTCDay() || 7;
}

/**
 * Returns the English name of the ISO weekday for a given date.
 * @param {Date} date
 * @returns {string}
 */
export function isoWeekDayName(date) {
  const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return names[isoWeekDay(date) - 1];
}

/**
 * Returns the day of the year (1-366) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfYear(date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

/**
 * Returns the day of the month (1-31) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfMonth(date) {
  return date.getUTCDate();
}

/**
 * Returns the day of the week (0-6, Sunday = 0) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfWeek(date) {
  return date.getUTCDay();
}

/**
 * Returns the ISO week number for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeek(date) {
  return isoWeekNumber(date);
}

/**
 * Returns the ISO week-numbering year for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOYear(date) {
  return isoWeekYear(date);
}

/**
 * Returns the ISO week-numbering year for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYear(date) {
  return isoWeekYear(date);
}

/**
 * Returns the ISO week number for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekNumber(date) {
  return isoWeekNumber(date);
}

/**
 * Returns the ISO week-numbering year for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumber(date) {
  return isoWeekYear(date);
}

/**
 * Returns the ISO week number for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumberDay(date) {
  return isoWeekNumber(date);
}

/**
 * Returns the English name of the ISO weekday for a given date.
 * @param {Date} date
 * @returns {string}
 */
export function isoWeekDayOfISOWeekYearNumberDayName(date) {
  return isoWeekDayName(date);
}

/**
 * Returns the ISO weekday number (1-7) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumberDayNumber(date) {
  return isoWeekDay(date);
}

/**
 * Returns the day of the year (1-366) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumberDayOfYear(date) {
  return isoWeekDayOfYear(date);
}

/**
 * Returns the day of the month (1-31) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumberDayOfMonth(date) {
  return isoWeekDayOfMonth(date);
}

/**
 * Returns the day of the week (0-6, Sunday = 0) for a given date.
 * @param {Date} date
 * @returns {number}
 */
export function isoWeekDayOfISOWeekYearNumberDayOfWeek(date) {
  return isoWeekDayOfWeek(date);
}
