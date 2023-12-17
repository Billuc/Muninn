<script setup lang="ts">
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
const emit = defineEmits(["remove-node", "edit-node"]);
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

const data = computed(() => buildTree(props.elements, ""));
const ticked = computed(() => props.elements.filter((el) => el.done));

const editNode = (id: string, v: string) => {
  emit("edit-node", { id: id, value: v });
};

const removeNode = (id: string) => {
  emit("remove-node", id);
};

const fixExpanded = (id: string) => {
  // Clicking to edit also toggles expand, so we toggle it again
  tree.value?.setExpanded(id, !tree.value?.isExpanded(id));
};
</script>

<template>
  <QTree
    :nodes="data"
    node-key="id"
    :ticked="ticked"
    tick-strategy="leaf-filtered"
    ref="tree"
  >
    <template #default-header="{ node }">
      <div>{{ node.label }}</div>
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
