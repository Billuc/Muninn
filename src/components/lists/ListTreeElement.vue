<script setup lang="ts">
import { useService } from "@/composables/useService";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";
import { ListElement } from "@/data/models/List";
import { ListElementService } from "@/data/services/listElementService";
import { ref } from "vue";
import SortableListTree from "./SortableListTree.vue";

interface ListTreeElementProps {
  element: ListElement;
  listId: ID;
}

const props = defineProps<ListTreeElementProps>();
const listElementService = useService(ListElementService);

const childrenData = await listElementService.getAllChildren(
  props.listId,
  props.element.id
);
const children = ref(childrenData);
useSubscription(
  listElementService,
  children,
  (el) => el.parentId == props.element.id
);

const onSave = async (v: string | number | null) => {
  if (!v) await listElementService.remove(props.element.id);
  else
    await listElementService.update({ id: props.element.id, title: String(v) });
};
const onTick = async (v: boolean) =>
  await listElementService.update({ id: props.element.id, done: v });
const onNewChild = async (v: any) =>
  await listElementService.create({
    listId: props.listId,
    title: v,
    parentId: props.element.id,
  });
const onOrderElements = async (v: ListElement[]) =>
  await listElementService.sortChildren(props.element.id, v);
</script>

<template>
  <div>
    <div class="col row q-pt-sm">
      <QCheckbox
        :model-value="props.element.done"
        dense
        @update:model-value="onTick"
      />

      <div class="q-ml-sm element">
        {{ props.element.title }}

        <QPopupEdit
          :model-value="props.element.title"
          v-slot="scope"
          @save="onSave"
        >
          <QInput
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            clearable
          />
        </QPopupEdit>
      </div>
    </div>

    <SortableListTree
      :elements="children"
      :list-id="props.listId"
      @update:elements="onOrderElements"
      class="q-pl-lg"
    />

    <div class="new-element">
      <div>New element</div>

      <QPopupEdit :model-value="''" v-slot="scope" @save="onNewChild">
        <QInput
          v-model="scope.value"
          dense
          autofocus
          @keyup.enter="scope.set"
          clearable
        />
      </QPopupEdit>
    </div>
  </div>
</template>

<style>
.element {
  flex-grow: 1;
}

.new-element {
  padding: 4px 0 0 16px;
  color: #8e8e8e;
}
</style>
