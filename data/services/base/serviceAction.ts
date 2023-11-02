import type { ID } from "../../models/ID";

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

interface RemoveServiceAction<T> {
  action: "remove";
  id: ID;
}

type ServiceAction<T> =
  | CreateServiceAction<T>
  | UpdateServiceAction<T>
  | RemoveServiceAction<T>;
export type { ServiceAction as default };
