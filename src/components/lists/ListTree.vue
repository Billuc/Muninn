<script setup lang="ts">
import { ID } from "@/data/models/ID";
import { ListElement } from "@/data/models/List";
import _ from "lodash";
import { QTree } from "quasar";
import { computed, ref } from "vue";

interface ListTreeProps {
  elements: ListElement[];
}

interface TreeElement {
  id: string;
  label: string;
  children: TreeElement[];
}

const props = defineProps<ListTreeProps>();
const emit = defineEmits([
  "remove-node",
  "edit-node",
  "add-node",
  "tick",
  "untick",
]);
const tree = ref<InstanceType<typeof QTree> | null>(null);

const buildTree = (elements: ListElement[], parentId: string) => {
  const data: TreeElement[] = _(elements)
    .chain()
    .filter((e) => e.parentId == parentId)
    .map((e) => ({
      id: e.id,
      label: e.title,
      children: buildTree(elements, e.id),
    }))
    .value();

  return data;
};

const data = computed(() => {
  const tree = buildTree(props.elements, "");
  tree.push({
    id: "",
    label: "",
    children: [],
  });
  return tree;
});
const ticked = computed(() =>
  props.elements.filter((el) => el.done).map((el) => el.id)
);

const editNode = (id: string, v: string) => {
  const value = v.trim();
  if (!id && !!value) emit("add-node", { title: value });
  else if (!!value) emit("edit-node", { id, value });
  else emit("remove-node", id);
};
const removeNode = (id: string) => emit("remove-node", id);
const fixExpanded = (id: string) => {
  // Clicking to edit also toggles expand, so we toggle it again
  tree.value?.setExpanded(id, !tree.value?.isExpanded(id));
};
const onTick = (tickedArray: readonly ID[]) => {
  const toTick = tickedArray.filter(
    (id) => !!id && !ticked.value.some((el) => el == id)
  );
  const toUntick = ticked.value.filter(
    (el) => !tickedArray.some((id) => el == id)
  );

  console.log(tickedArray, toTick, toUntick);

  emit("tick", toTick);
  emit("untick", toUntick);
};
</script>

<template>
  <QTree
    :nodes="data"
    node-key="id"
    :ticked="ticked"
    tick-strategy="leaf-filtered"
    ref="tree"
    class="montserrat"
    @update:ticked="onTick"
  >
    <template #default-header="{ node }">
      <div v-if="node.id">{{ node.label }}</div>
      <div class="new-element" v-else>New element</div>
      <QPopupEdit
        :model-value="node.label"
        v-slot="scope"
        @save="(v) => editNode(node.id, v)"
        @before-show="() => fixExpanded(node.id)"
      >
        <QInput
          v-model="scope.value"
          dense
          autofocus
          @keyup.enter="scope.set"
          clearable
          @clear="() => removeNode(node.id)"
        />
      </QPopupEdit>
    </template>
  </QTree>
</template>

<style>
.new-element {
  opacity: 0.5;
}
</style>
