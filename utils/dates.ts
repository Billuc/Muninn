import {
  addHours,
  addMinutes,
  format,
  intervalToDuration,
  parse,
} from "date-fns";

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
