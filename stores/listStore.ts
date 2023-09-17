import { ListElement, List } from "~/models/List";
import { definePersistedStore } from "~/tools/persistedPinia";

export const useListStore = definePersistedStore("lists", {
  state: () => ({
    lists: new Map<number, List>(),
    nextListId: 0,
  }),
  getters: {
    getList: (state) => {
      return (listId: number) => {
        if (!state.lists.has(listId)) {
          throw new Error(`[Lists] List with ID ${listId} not found`);
        }
        return state.lists.get(listId)!;
      };
    },
  },
  actions: {
    newList(title: string) {
      this.lists.set(this.nextListId, {
        id: this.nextListId,
        title: title,
        elements: new Map<number, ListElement>(),
        nextElementId: 0,
      });
      this.nextListId++;
    },
    editList(listId: number, title: string) {
      this.getList(listId).title = title;
    },
    removeList(listId: number) {
      if (!this.lists.delete(listId)) {
        throw new Error(`[Lists] List with ID ${listId} not found`);
      }
    },
    newElement(listId: number, title: string) {
      const list = this.getList(listId);
      list.elements.set(list.nextElementId, {
        id: list.nextElementId,
        title: title,
        done: false,
        index: list.elements.size,
      });
      list.nextElementId++;
    },
    editElement(listId: number, elementId: number, title: string, done: boolean) {
      const list = this.getList(listId);
      if (!list.elements.has(elementId)) {
        throw new Error(
          `[Lists] Element with ID ${elementId} not found in list ${list.title}`
        );
      }
      list.elements.get(elementId)!.title = title;
      list.elements.get(elementId)!.done = done;
    },
    removeElement(listId: number, elementId: number) {
      const list = this.getList(listId);
      if (!list.elements.delete(elementId)) {
        throw new Error(
          `[Lists] Element with ID ${elementId} not found in list ${list.title}`
        );
      }
    },
    orderElements(listId: number, elements: ListElement[]) {
      const list = this.getList(listId);
      elements.forEach((element, index) => {
        if (!list.elements.has(element.id)) {
          throw new Error(
            `[Lists] Element with ID ${element.id} not found in list ${list.title}`
          );
        }

        list.elements.get(element.id)!.index = index;
      });
    },
    removeChecked(listId: number) {
      const list = this.getList(listId);

      for (const elementId of list.elements.keys()) {
        const element = list.elements.get(elementId)!;
        if (element.done) {
          list.elements.delete(elementId);
        }
      }
    },
  },
});
