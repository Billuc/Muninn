import { format, intervalToDuration, parse } from "date-fns";

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatTime(date: Date) {
  return format(date, "HH:mm");
}

export function formatDuration(start: Date, end: Date) {
  const duration = intervalToDuration({ start: start, end: end });
  return `${("0" + duration.hours?.toString() ?? "0").slice(-2)}:${(
    "0" + duration.minutes?.toString() ?? "0"
  ).slice(-2)}`;
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

export function parseTimeAsMinutes(timeAsString: string) {
  const time = parse(timeAsString, "HH:mm", new Date());
  return 60 * time.getHours() + time.getMinutes();
}
