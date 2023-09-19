export interface Tag {
  id: number;
  title: string;
  color: TagColor;
  icon: string[];
}

export enum TagColor {
  red = "red",
  orange = "orange",
  yellow = "yellow",
  lime = "lime",
  cyan = "cyan",
  lightblue = "lightblue",
  magenta = "magenta",
}
