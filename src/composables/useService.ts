import { inject } from "vue";

import type { DependencyContainer, InjectionToken } from "tsyringe";

export const useService = <T>(token: InjectionToken<T>): T => {
  const myContainer: DependencyContainer | undefined = inject("container");

  if (!myContainer)
    throw Error(
      "DependencyContainer not available ! Are you using the DI plugin ?"
    );

  return myContainer.resolve(token);
};
