import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  eachDayOfInterval,
  endOfDay,
  format,
  intervalToDuration,
  isSameDay,
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

export function prettyFormatInterval(start: Date, end?: Date) {
  if (!end) {
    return format(start, "dd MMM HH:mm");
  }

  if (isSameDay(start, end)) {
    return format(start, "dd MMM HH:mm") + " - " + format(end, "HH:mm");
  }

  return format(start, "dd MMM HH:mm") + " - " + format(end, "dd MMM HH:mm");
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

export const nextRepetition = (event: Event, fromDate: Date) => {
  const end = event.end ?? event.start;
  if (fromDate < end) return event;

  switch (event.frequency) {
    case Frequency.Once:
      return fromDate < end ? event : null;
    case Frequency.Daily: {
      const daysDifference = differenceInCalendarDays(fromDate, end);
      const repetitionFactor = Math.ceil(
        daysDifference / event.frequencyMultiplier
      );
      const daysToAdd = event.frequencyMultiplier * repetitionFactor;

      return {
        ...event,
        start: addDays(event.start, daysToAdd),
        end: addDays(end, daysToAdd),
      };
    }
    case Frequency.Weekly: {
      const daysDifference = differenceInCalendarDays(fromDate, end);
      const repetitionFactor = Math.ceil(
        daysDifference / (7 * event.frequencyMultiplier)
      );
      const daysToAdd = 7 * event.frequencyMultiplier * repetitionFactor;

      return {
        ...event,
        start: addDays(event.start, daysToAdd),
        end: addDays(end, daysToAdd),
      };
    }
    case Frequency.Monthly: {
      const monthDifference = differenceInCalendarMonths(fromDate, end);
      const repetitionFactor = Math.ceil(
        monthDifference / event.frequencyMultiplier
      );
      const monthsToAdd = event.frequencyMultiplier * repetitionFactor;

      return {
        ...event,
        start: addMonths(event.start, monthsToAdd),
        end: addMonths(end, monthsToAdd),
      };
    }
    case Frequency.Yearly: {
      const yearDifference = differenceInCalendarYears(fromDate, end);
      const repetitionFactor = Math.ceil(
        yearDifference / event.frequencyMultiplier
      );
      const yearsToAdd = event.frequencyMultiplier * repetitionFactor;

      return {
        ...event,
        start: addYears(event.start, yearsToAdd),
        end: addYears(end, yearsToAdd),
      };
    }
  }
};
