import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isoWeekYear,
  isoWeekNumber,
  isoWeekStart,
  isoWeekEnd,
  isoWeekString,
  isoWeekFromDate,
  isoWeekRange,
  isoWeekDay,
  isoWeekDayName,
  isoWeekDayOfYear,
  isoWeekDayOfMonth,
  isoWeekDayOfWeek,
} from '../src/index.js';

test('isoWeekYear and isoWeekNumber for 2024-01-01', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  assert.equal(isoWeekYear(date), 2024);
  assert.equal(isoWeekNumber(date), 1);
});

test('isoWeekYear and isoWeekNumber for 2023-01-01', () => {
  const date = new Date(Date.UTC(2023, 0, 1));
  assert.equal(isoWeekYear(date), 2022);
  assert.equal(isoWeekNumber(date), 52);
});

test('isoWeekYear and isoWeekNumber for 2025-01-01', () => {
  const date = new Date(Date.UTC(2025, 0, 1));
  assert.equal(isoWeekYear(date), 2025);
  assert.equal(isoWeekNumber(date), 1);
});

test('isoWeekStart and isoWeekEnd for 2024-01-01', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  const start = isoWeekStart(date);
  const end = isoWeekEnd(date);
  assert.equal(start.toISOString().slice(0, 10), '2024-01-01');
  assert.equal(end.toISOString().slice(0, 10), '2024-01-07');
});

test('isoWeekString for 2024-01-01', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  assert.equal(isoWeekString(date), '2024-W01');
});

test('isoWeekFromDate for 2024-W01', () => {
  const date = isoWeekFromDate('2024-W01');
  assert.equal(date.toISOString().slice(0, 10), '2024-01-01');
});

test('isoWeekRange for 2024-01-01', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  const range = isoWeekRange(date);
  assert.equal(range.length, 7);
  assert.equal(range[0].toISOString().slice(0, 10), '2024-01-01');
  assert.equal(range[6].toISOString().slice(0, 10), '2024-01-07');
});

test('isoWeekDay and isoWeekDayName for 2024-01-01', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  assert.equal(isoWeekDay(date), 1);
  assert.equal(isoWeekDayName(date), 'Monday');
});

test('isoWeekDayOfYear, isoWeekDayOfMonth, isoWeekDayOfWeek', () => {
  const date = new Date(Date.UTC(2024, 0, 1));
  assert.equal(isoWeekDayOfYear(date), 1);
  assert.equal(isoWeekDayOfMonth(date), 1);
  assert.equal(isoWeekDayOfWeek(date), 1);
});

test('isoWeekFromDate throws on invalid string', () => {
  assert.throws(() => isoWeekFromDate('2024-W00'), /Invalid ISO week number/);
  assert.throws(() => isoWeekFromDate('2024-W54'), /Invalid ISO week number/);
  assert.throws(() => isoWeekFromDate('2024-01'), /Invalid ISO week string/);
});

test('isoWeekNumber for 2020-12-31 (week 53)', () => {
  const date = new Date(Date.UTC(2020, 11, 31));
  assert.equal(isoWeekNumber(date), 53);
});

test('isoWeekNumber for 2021-01-01 (week 53 of 2020)', () => {
  const date = new Date(Date.UTC(2021, 0, 1));
  assert.equal(isoWeekYear(date), 2020);
  assert.equal(isoWeekNumber(date), 53);
});
