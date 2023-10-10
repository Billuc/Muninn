import { format, intervalToDuration, parse } from "date-fns";

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

export function parseDateTime(dateAsString: string, timeAsString: string) {
  return parse(
    `${dateAsString}T${timeAsString}`,
    "yyyy-MM-dd'T'HH:mm",
    new Date()
  );
}
