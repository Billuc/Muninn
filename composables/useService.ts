import { type InjectionToken, container } from "tsyringe";

export const useService = <T>(token: InjectionToken<T>): T => {
  return container.resolve(token);
};
