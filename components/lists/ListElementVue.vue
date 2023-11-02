<template>
  <div
    :class="
      mergeClasses('m-0', 'flex', 'flex-nowrap', 'items-start', 'gap-x-2')
    "
  >
    <div class="flex flex-nowrap items-center gap-x-4">
      <FontAwesomeIcon :icon="faBars" class="handle cursor-pointer" size="lg" />
      <Checkbox
        :value="props.element.done"
        @update:value="updateDone"
        class="checkbox-primary"
        ref="checkbox"
      />
    </div>

    <MultilineInput
      :value="title"
      placeholder="Write here..."
      @update:value="updateTitle"
      :class="
        mergeClasses(
          'flex-grow',
          '!leading-5',
          props.element.done ? 'line-through' : undefined
        )
      "
      detect-enter
      @enter="updateNow"
    />
    <Button
      :icon="faRemove"
      class="btn-circle !btn-xs"
      @click="removeElement"
    />
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { faBars, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { type ListElement } from "~/data/models/List";
import { type ID } from "~/data/models/ID";
import { useGeneralStore } from "~/data/stores/generalStore";
import { SyncStatus } from "~/data/models/Status";
import type { Checkbox } from "#build/components";
import { ListElementService } from "~/data/services/listElementService";

interface ListElementVueProps {
  listId: ID;
  element: ListElement;
}

const props = defineProps<ListElementVueProps>();
const generalStore = useGeneralStore();
const service = useService(ListElementService);
const checkbox = ref<InstanceType<typeof Checkbox> | null>(null);

const title = ref(props.element.title);

const { loading, execute: updateDone } = useAsyncAction(async (newDone: boolean) => {
  generalStore.setSyncStatus(SyncStatus.Syncing);
  await service.update({
    id: props.element.id,
    done: newDone,
  });
  generalStore.setSyncStatus(SyncStatus.Synced);
})
const updateTitle = async (newTitle: string) => {
  title.value = newTitle;
  
  generalStore.setSyncStatus(SyncStatus.Syncing);
  await debouncedUpdate(null);
};
const { loading: removing, execute: removeElement } = useAsyncAction(async () => {
  await service.remove(props.element.id);
})

const { loading: updating, execute: update } = useAsyncAction(async () => {
  if (!title.value) await service.remove(props.element.id);
  else await service.update({ id: props.element.id, title: title.value });

  generalStore.setSyncStatus(SyncStatus.Synced);
})

const debouncedUpdate = _.debounce(update, 2000);
const updateNow = async () => {
  debouncedUpdate.cancel();
  await update(null);
};
</script>
