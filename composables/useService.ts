import { InjectionToken, container } from "tsyringe";

export function useService<T>(token: InjectionToken<T>): T {
    return container.resolve(token)
}