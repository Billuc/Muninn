import { reactive } from "vue";

type StateRef<Data, Error> = {
  data: Data | undefined;
  error: Error | undefined;
  loading: boolean;
};

export const useAsyncAction = <TParam, TResult>(
  action: (arg: TParam) => Promise<TResult | void>
) => {
  const state = reactive({
    data: undefined,
    error: undefined,
    loading: false,
  }) as StateRef<TResult, any>;

  const execute = async (arg: TParam) => {
    state.loading = true;

    try {
      state.data = (await action(arg)) ?? undefined;
    } catch (e: any) {
      state.error = e;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...state,
    execute,
  };
};
