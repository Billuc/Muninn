export interface Event {
  id: number;
  title: string;
  description: string;
  start: Date;
  end?: Date;
  frequency: Frequency;
}

export interface EventData {
  id: number;
  title: string;
  description: string;
  start: string;
  end?: string;
  frequency: Frequency;
}

export interface UpdateEvent {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  frequency?: Frequency;
}

export enum Frequency {
  Once,
  Daily,
  Weekly,
  Monthly,
  Yearly,
}
