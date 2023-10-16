import { ListElement, List, ListElementDTO } from "~/models/List";
import { definePersistedStore } from "~/tools/persistedPinia";

export const useListStore = definePersistedStore("lists", {
  state: () => ({
    lists: new Map<number, List>(),
    nextListId: 0,
  }),
  actions: {
    getList(listId: number) {
      if (!this.lists.has(listId))
        throw new Error(`[Lists] List with ID ${listId} not found`);
      else return this.lists.get(listId)!;
    },
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
    newElement(listId: number, title: string, parentId?: number) {
      const list = this.getList(listId);
      list.elements.set(list.nextElementId, {
        id: list.nextElementId,
        title: title,
        done: false,
        index: list.elements.size,
        parentId: parentId,
      });
      list.nextElementId++;
    },
    editElement(
      listId: number,
      elementId: number,
      title: string,
      done: boolean
    ) {
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
      const children = this.getElementChildren(listId, elementId);

      if (!list.elements.delete(elementId)) {
        throw new Error(
          `[Lists] Element with ID ${elementId} not found in list ${list.title}`
        );
      }
      children.forEach((el) => this.removeElement(listId, el.id));
    },
    orderElements(
      listId: number,
      elements: ListElementDTO[],
      elementId?: number
    ) {
      const list = this.getList(listId);
      elements.forEach((element, index) => {
        if (!list.elements.has(element.id)) {
          throw new Error(
            `[Lists] Element with ID ${element.id} not found in list ${list.title}`
          );
        }

        list.elements.get(element.id)!.index = index;
        list.elements.get(element.id)!.parentId = elementId;

        this.orderElements(listId, element.children, element.id);
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
    getElementChildren(listId: number, elementId: number) {
      var children = [];

      for (const [id, element] of this.getList(listId).elements) {
        if (element.parentId === elementId) children.push(element);
      }

      return children;
    },
  },
});
