import { ID } from "./ID";

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

export interface EventData {
  id: ID;
  description?: string;
  title: string;
  start: string;
  end?: string;
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
