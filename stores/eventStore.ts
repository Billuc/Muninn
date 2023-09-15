import { endOfDay, format, parse, startOfDay } from "date-fns";
import { Event, EventData, UpdateEvent } from "~/models/Event";
import { definePersistedStore } from "~/tools/persistedPinia";

const formatDate = (key: Date) => format(key, "yyyy-MM-dd HH:mm");
const parseDate = (key: string) => parse(key, "yyyy-MM-dd HH:mm", new Date());

export const useEventStore = definePersistedStore("events", {
  state: () => ({
    events: new Map<number, EventData>(),
    nextEventId: 0,
  }),
  actions: {
    getEventsOfDay(day: Date): Event[] {
      return [...this.events.values()]
        .filter(
          (evD) =>
            startOfDay(parseDate(evD.start)) <= day &&
            endOfDay(parseDate(evD.end ?? evD.start)) >= day
        )
        .map((evD) => ({
          id: evD.id,
          description: evD.description,
          frequency: evD.frequency,
          start: parseDate(evD.start),
          title: evD.title,
          end: evD.end ? parseDate(evD.end) : undefined,
        }));
    },
    newEvent(event: Omit<Event, "id">) {
      const eventData: EventData = {
        id: this.nextEventId,
        title: event.title,
        description: event.description,
        frequency: event.frequency,
        start: formatDate(event.start),
        end: event.end ? formatDate(event.end) : undefined,
      };
      this.events.set(this.nextEventId, eventData);
      this.nextEventId++;
    },
    editEvent(key: number, event: UpdateEvent) {
      const eventToEdit = this.events.get(key);

      if (!eventToEdit) {
        throw new Error(`[Events] Key ${key} not found`);
      }

      const eventData: EventData = {
        id: key,
        title: event.title ?? eventToEdit.title,
        description: event.description ?? eventToEdit.description,
        frequency: event.frequency ?? eventToEdit.frequency,
        start: event.start ? formatDate(event.start) : eventToEdit.start,
        end: event.end ? formatDate(event.end) : eventToEdit.end,
      };
      this.events.set(key, eventData);
    },
    removeEvent(key: number) {
      if (!this.events.delete(key))
        throw new Error(`[Events] Key ${key} not found`);
    },
  },
});