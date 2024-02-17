<script setup lang="ts">
import { useService } from "@/composables/useService";
import { ListElement } from "@/data/models/List";
import { ListElementService } from "@/data/services/listElementService";

interface ListElementVueProps {
  element: ListElement;
}

const props = defineProps<ListElementVueProps>();
const listElementService = useService(ListElementService);

const onSave = async (v: string | null) => {
  const value = v?.trim();
  if (!!value)
    await listElementService.update({ id: props.element.id, title: value });
};
const onRemove = async () => await listElementService.remove(props.element.id);
const onTick = async () => {
  await listElementService.update({
    id: props.element.id,
    done: !props.element.done,
  });
};
</script>

<template>
  <div class="col row justify-center">
    <QIcon name="mdi-reorder-horizontal" size="xs" class="q-mr-sm handle" />

    <QCheckbox
      :model-value="props.element.done"
      dense
      @update:model-value="onTick"
    />

    <div class="q-ml-sm col">
      {{ props.element.title }}

      <QPopupEdit
        :model-value="props.element.title"
        v-slot="scope"
        @save="onSave"
      >
        <div class="row items-center">
          <QInput
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            clearable
            class="col q-mr-sm"
          />
          <QBtn
            round
            size="xs"
            icon="mdi-delete"
            color="negative"
            @click="onRemove"
          />
        </div>
      </QPopupEdit>
    </div>
  </div>
</template>
