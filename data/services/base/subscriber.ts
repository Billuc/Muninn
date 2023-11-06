import { type Ref } from "vue";
import type ServiceAction from "./serviceAction";
import type { ID } from "../../models/ID";

export default class ServiceSubscriber<T extends { id: ID }> {
  private _value: Ref<T | null> | Ref<T[] | null>;
  private _filter: (v: T) => boolean;

  constructor(
    value: Ref<T | null> | Ref<T[] | null>,
    filter: (v: T) => boolean = (v: T) => true
  ) {
    this._value = value;
    this._filter = filter;
  }

  next(action: ServiceAction<T>) {
    switch (action.action) {
      case "create":
        if (Array.isArray(this._value.value) && this._filter(action.value)) {
          this._value.value.push(action.value);
        }
        break;
      case "update":
        if (!this._filter(action.value)) break;

        if (Array.isArray(this._value.value)) {
          const index = this._value.value.findIndex((t) => t.id == action.id);
          this._value.value.splice(index, 1, action.value);
        } else if (this._value.value && this._value.value.id === action.id) {
          this._value.value = action.value;
        }
        break;
      case "remove":
        if (Array.isArray(this._value.value)) {
          this._value.value.filter((t) => t.id !== action.id);
        } else if (this._value.value && this._value.value.id === action.id) {
          this._value.value = null;
        }
        break;
    }
  }
}
