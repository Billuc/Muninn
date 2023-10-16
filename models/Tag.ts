import { ID } from "./ID";

export interface Tag {
  id: ID;
  title: string;
  color: TagColor;
  icon: string[];
}

export enum TagColor {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  green = "green",
  cyan = "cyan",
  blue = "blue",
  magenta = "magenta",
}

export const TagOrder = new Map<TagColor, number>([
  [TagColor.red, 0],
  [TagColor.orange, 1],
  [TagColor.yellow, 2],
  [TagColor.green, 3],
  [TagColor.cyan, 4],
  [TagColor.blue, 5],
  [TagColor.magenta, 6],
]);
