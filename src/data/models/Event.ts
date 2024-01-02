import type { ID } from "./ID";
import { Tag } from "./Tag";

export interface Event {
  id: ID;
  description: string;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  frequencyMultiplier: number;
  tagId: ID;
}

export interface EventAndTag {
  id: ID;
  description: string;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  frequencyMultiplier: number;
  tag: Tag | null;
}

export interface CreateEvent {
  description: string;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  frequencyMultiplier: number;
  tagId: ID;
}

export interface UpdateEvent {
  title?: ID;
  description?: string;
  start?: Date;
  end?: Date;
  frequency?: Frequency;
  frequencyMultiplier?: number;
  tagId?: ID;
}

export enum Frequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}

export const FrequencyMapper: { [k in Frequency]: string } = {
  [Frequency.Once]: "Once",
  [Frequency.Daily]: "Every X days",
  [Frequency.Weekly]: "Every X weeks",
  [Frequency.Monthly]: "Every X months",
  [Frequency.Yearly]: "Every X years",
};
