import { type Ref } from "vue";
import SubscribableService from "~/data/services/base/subscribable";

export const useSubscription = <T extends { id: string }>(
  service: SubscribableService<T>,
  ref: Ref<T | null> | Ref<T[] | null>,
  filter?: (v: T) => boolean
) => {
  const subscription = service.subscribe(ref, filter);

  onUnmounted(() => subscription.unsubscribe());
};
