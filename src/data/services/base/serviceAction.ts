import type { ID } from "@/data/models/ID";

interface CreateServiceAction<T> {
  action: "create";
  id: ID;
  value: T;
}

interface UpdateServiceAction<T> {
  action: "update";
  id: ID;
  value: T;
}

interface RemoveServiceAction {
  action: "remove";
  id: ID;
}

type ServiceAction<T> =
  | CreateServiceAction<T>
  | UpdateServiceAction<T>
  | RemoveServiceAction;
export type { ServiceAction as default };
