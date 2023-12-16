import {
  addHours,
  addMinutes,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  eachDayOfInterval,
  endOfDay,
  format,
  intervalToDuration,
  parse,
  startOfDay,
} from "date-fns";

import { Frequency } from "@/data/models/Event";

import type { Event } from "@/data/models/Event";

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatTime(date: Date) {
  return format(date, "HH:mm");
}

export function getDuration(start: Date, end: Date) {
  return intervalToDuration({ start: start, end: end });
}

export function parseDate(dateAsString: string) {
  return parse(dateAsString, "yyyy-MM-dd", new Date());
}

export function parseDateTime(dateAsString: string, time: [number?, number?]) {
  const date = parseDate(dateAsString);
  if (time[0]) date.setHours(time[0]);
  if (time[1]) date.setMinutes(time[1]);
  return date;
}

export function addDuration(date: Date, duration: [number?, number?]) {
  let dateWithDuration = addHours(date, duration[0] ?? 0);
  dateWithDuration = addMinutes(dateWithDuration, duration[1] ?? 0);
  return dateWithDuration;
}

export const hasRepetitionAtDay = (event: Event, day: Date) => {
  const start = event.start;
  const end = event.end ?? event.start;

  if (day < startOfDay(start)) return false;

  switch (event.frequency) {
    case Frequency.Once:
      return endOfDay(end) >= day;
    case Frequency.Daily:
      return eachDayOfInterval({ start, end }).some(
        (d) => differenceInCalendarDays(d, day) % event.frequencyMultiplier == 0
      );
    case Frequency.Weekly:
      return eachDayOfInterval({ start, end }).some((d) => {
        const difference = differenceInCalendarDays(d, day);
        return (
          difference % 7 == 0 &&
          (difference / 7) % event.frequencyMultiplier == 0
        );
      });
    case Frequency.Monthly:
      return eachDayOfInterval({ start, end }).some(
        (d) =>
          d.getDate() === day.getDate() &&
          differenceInCalendarMonths(d, day) % event.frequencyMultiplier == 0
      );
    case Frequency.Yearly:
      return eachDayOfInterval({ start, end }).some(
        (d) =>
          d.getDate() === day.getDate() &&
          d.getMonth() === day.getMonth() &&
          differenceInCalendarYears(d, day) % event.frequencyMultiplier == 0
      );
    default:
      return false;
  }
};
