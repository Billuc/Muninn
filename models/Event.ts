export interface Event {
  id: number;
  title: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
  tagId: number;
}

export interface EventData {
  id: number;
  title: string;
  start: string;
  end?: string;
  frequency: Frequency;
  tagId: number;
}

export interface UpdateEvent {
  title?: string;
  start?: Date;
  end?: Date;
  frequency?: Frequency;
  tagId?: number;
}

export enum Frequency {
  Once = "once",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
}
