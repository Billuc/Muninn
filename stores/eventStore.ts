import {
  eachDayOfInterval,
  endOfDay,
  format,
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
      return true;
    case Frequency.Weekly:
      return eachDayOfInterval({ start, end }).some(
        (d) => d.getDay() === day.getDay()
      );
    case Frequency.Monthly:
      return eachDayOfInterval({ start, end }).some(
        (d) => d.getDate() === day.getDate()
      );
    case Frequency.Yearly:
      return eachDayOfInterval({ start, end }).some(
        (d) => d.getDate() === day.getDate() && d.getMonth() === day.getMonth()
      );
    default:
      return false;
  }
};

export const useEventStore = definePersistedStore("events", {
  state: () => ({
    events: new Map<ID, EventData>(),
    tags: new Map<ID, Tag>(),
    nextEventId: 0,
    nextTagId: 0,
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
          frequency: evD.frequency,
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
        frequency: event.frequency,
        start: formatDate(event.start),
        end: event.end ? formatDate(event.end) : undefined,
        tagId: event.tagId,
      };
      this.events.set(eventData.id, eventData);
      this.nextEventId++;
    },
    editEvent(key: ID, event: UpdateEvent) {
      const eventToEdit = this.events.get(key);

      if (!eventToEdit) {
        throw new Error(`[Events] Key ${key} not found`);
      }

      const eventData: EventData = {
        id: key,
        title: event.title ?? eventToEdit.title,
        frequency: event.frequency ?? eventToEdit.frequency,
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
      this.nextTagId++;
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
