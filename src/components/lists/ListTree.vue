<script setup lang="ts">
import { ID } from "@/data/models/ID";
import { ListElement } from "@/data/models/List";
import _ from "lodash";
import { QTree } from "quasar";
import { computed, ref } from "vue";
import ListTreeElement from "./ListTreeElement.vue";

interface ListTreeProps {
  elements: ListElement[];
}

interface TreeElement {
  id: string;
  label: string;
  children: TreeElement[];
  tickStrategy?: "leaf" | "leaf-filtered" | "string" | "none";
  parentId: ID;
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
    .map<TreeElement>((e) => ({
      id: e.id,
      label: e.title,
      children: buildTree(elements, e.id),
      parentId: parentId,
    }))
    .push({
      id: "",
      label: "",
      children: [],
      tickStrategy: "none",
      parentId: parentId,
    })
    .value();

  return data;
};

const data = computed(() => buildTree(props.elements, ""));
const ticked = computed(() =>
  _(props.elements)
    .chain()
    .filter((el) => el.done)
    .map((el) => el.id)
    .push("")
    .value()
);

const editNode = (id: string, v: string | null, parentId?: string) => {
  const value = v?.trim();
  if (!id && !!value) emit("add-node", { title: value, parentId: parentId });
  else if (!!value) emit("edit-node", { id, value });
  else if (!!id) emit("remove-node", id);
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
    (el) => !!el && !tickedArray.some((id) => el == id)
  );

  emit("tick", toTick);
  emit("untick", toUntick);
};
</script>

<template>
  <div class="montserrat">
    <QTree
      :nodes="data"
      node-key="id"
      :ticked="ticked"
      tick-strategy="strict"
      ref="tree"
      @update:ticked="onTick"
    >
      <template #default-header="{ node }">
        <ListTreeElement
          :id="node.id"
          :label="node.label"
          @update="(v) => editNode(node.id, v, node.parentId)"
          @show-popup="() => fixExpanded(node.id)"
          @remove="() => removeNode(node.id)"
        />
      </template>
    </QTree>
  </div>
</template>

<style>
.new-element {
  color: #9e9e9e;
}
</style>
