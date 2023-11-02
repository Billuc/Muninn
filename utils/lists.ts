import _ from "lodash";
import type { ID } from "~/data/models/ID";
import type { ListTreeElement } from "~/data/models/List";
import type { ListElement } from "~/data/models/List";

export function buildListTree(
  listId: ID,
  elements: ListElement[],
  elementId?: ID
): ListTreeElement[] {
  return _(elements)
    .chain()
    .filter((el) =>
      elementId === undefined
        ? el.parentId === undefined
        : el.parentId === elementId
    )
    .sortBy((el) => el.index)
    .map<ListTreeElement>((el) => ({
      id: el.id,
      title: el.title,
      done: el.done,
      index: el.index,
      children: buildListTree(listId, elements, el.id),
    }))
    .value();
}

export function flattenListTree(
  listId: ID,
  tree: ListTreeElement[],
  parentId?: ID
): ListElement[] {
  const elements: ListElement[] = [];

  tree.forEach((treeElement, i) => {
    elements.push({
      id: treeElement.id,
      title: treeElement.title,
      done: treeElement.done,
      index: i,
      listId: listId,
      parentId: parentId ?? "",
    });

    elements.concat(
      flattenListTree(listId, treeElement.children, treeElement.id)
    );
  });

  return elements;
}
