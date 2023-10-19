import { ID } from "~/models/ID";
import { ListElement, List, ListElementDTO } from "~/models/List";
import { definePersistedStore } from "~/tools/persistedPinia";
import { v4 as uuidv4 } from "uuid";

export const useListStore = definePersistedStore("lists", {
  state: () => ({
    lists: new Map<ID, List>(),
  }),
  actions: {
    getList(listId: ID) {
      if (!this.lists.has(listId))
        throw new Error(`[Lists] List with ID ${listId} not found`);
      else return this.lists.get(listId)!;
    },
    newList(title: string) {
      const listData = {
        id: uuidv4(),
        title: title,
        elements: new Map<ID, ListElement>(),
        nextElementId: 0
      }
      this.lists.set(listData.id, listData);
    },
    editList(listId: ID, title: string) {
      this.getList(listId).title = title;
    },
    removeList(listId: ID) {
      if (!this.lists.delete(listId)) {
        throw new Error(`[Lists] List with ID ${listId} not found`);
      }
    },
    newElement(listId: ID, title: string, parentId?: ID) {
      const list = this.getList(listId);
      const elementData = {
        id: uuidv4(),
        title: title,
        done: false,
        index: list.elements.size,
        parentId: parentId,
      };
      list.elements.set(elementData.id, elementData);
      list.nextElementId++;
    },
    editElement(
      listId: ID,
      elementId: ID,
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
    removeElement(listId: ID, elementId: ID) {
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
      listId: ID,
      elements: ListElementDTO[],
      elementId?: ID
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
    removeChecked(listId: ID) {
      const list = this.getList(listId);

      for (const elementId of list.elements.keys()) {
        const element = list.elements.get(elementId)!;
        if (element.done) {
          list.elements.delete(elementId);
        }
      }
    },
    getElementChildren(listId: ID, elementId: ID) {
      var children = [];

      for (const [id, element] of this.getList(listId).elements) {
        if (element.parentId === elementId) children.push(element);
      }

      return children;
    },
  },
});
