import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  eachDayOfInterval,
  endOfDay,
  format,
  getWeek,
  intervalToDuration,
  parse,
  startOfDay,
} from "date-fns";
import { Event, EventData, Frequency, UpdateEvent } from "~/models/Event";
import { Tag, TagColor } from "~/models/Tag";
import { definePersistedStore } from "~/tools/persistedPinia";
import _ from "lodash";
import { ID } from "~/models/ID";
import { v4 as uuidv4 } from "uuid";

const formatDate = (key: Date) => format(key, "yyyy-MM-dd HH:mm");
const parseDate = (key: string) => parse(key, "yyyy-MM-dd HH:mm", new Date());

const hasRepetitionAtDay = (event: EventData, day: Date) => {
  const start = parseDate(event.start);
  const end = parseDate(event.end ?? event.start);

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

export const useEventStore = definePersistedStore("events", {
  state: () => ({
    events: new Map<ID, EventData>(),
    tags: new Map<ID, Tag>(),
  }),
  getters: {
    tagArray: (state) => [...state.tags.values()],
  },
  actions: {
    getEventsOfDay(day: Date): Event[] {
      return [...this.events.values()]
        .filter((evD) => hasRepetitionAtDay(evD, day))
        .map((evD) => ({
          id: evD.id,
          description: evD.description ?? "",
          frequency: evD.frequency,
          frequencyMultiplier: evD.frequencyMultiplier,
          start: parseDate(evD.start),
          title: evD.title,
          end: evD.end ? parseDate(evD.end) : undefined,
          tagId: evD.tagId,
        }));
    },
    newEvent(event: Omit<Event, "id">) {
      const eventData: EventData = {
        id: uuidv4(),
        title: event.title,
        description: event.description,
        frequency: event.frequency,
        frequencyMultiplier: event.frequencyMultiplier,
        start: formatDate(event.start),
        end: event.end ? formatDate(event.end) : undefined,
        tagId: event.tagId,
      };
      this.events.set(eventData.id, eventData);
    },
    editEvent(key: ID, event: UpdateEvent) {
      const eventToEdit = this.events.get(key);

      if (!eventToEdit) {
        throw new Error(`[Events] Key ${key} not found`);
      }

      const eventData: EventData = {
        id: key,
        title: event.title ?? eventToEdit.title,
        description: event.description ?? eventToEdit.description,
        frequency: event.frequency ?? eventToEdit.frequency,
        frequencyMultiplier:
          event.frequencyMultiplier ?? eventToEdit.frequencyMultiplier,
        start: event.start ? formatDate(event.start) : eventToEdit.start,
        end: event.end ? formatDate(event.end) : eventToEdit.end,
        tagId: event.tagId ?? eventToEdit.tagId,
      };
      this.events.set(key, eventData);
    },
    removeEvent(key: ID) {
      if (!this.events.delete(key))
        throw new Error(`[Events] Key ${key} not found`);
    },
    newTag(title: string, color: TagColor, icon: string[]) {
      if (_.some([...this.tags.values()], (t) => t.color === color))
        throw new Error(`[Events] Tag with color ${color} already exists`);

      const tagData = {
        id: uuidv4(),
        title: title,
        color: color,
        icon: icon,
      };
      this.tags.set(tagData.id, tagData);
    },
    removeTag(tagId: ID) {
      this.tags.delete(tagId);
    },
    editTag(tagId: ID, title: string, color: TagColor, icon: string[]) {
      if (!this.tags.has(tagId))
        throw new Error(`[Events] Tag with ID ${tagId} not found`);

      if (
        _.some(
          [...this.tags.values()],
          (t) => t.id !== tagId && t.color === color
        )
      )
        throw new Error(`[Events] Tag with color ${color} already exists`);

      this.tags.set(tagId, {
        id: tagId,
        color: color,
        title: title,
        icon: icon,
      });
    },
  },
});
