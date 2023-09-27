<template>
  <SelectAlt
    :label="label ?? 'Tag'"
    :icon="faTag"
    :options="tagOptions"
    :value="String(selected)"
    @update:value="selectTag"
    @clear="() => selectTag('-1')"
    :clearable="clearable"
  >
    <template #selected="{ selected }">
      <TagVue
        :color="selected ? getTag(selected.value)?.color : undefined"
        :icon="selected ? getTag(selected.value)?.icon : undefined"
        :text="selected ? getTag(selected.value)?.title : undefined"
        class="w-full !btn-xs"
      />
    </template>
    <template #option="{ option, onSelect }">
      <TagVue
        :color="getTag(option.value)?.color"
        :icon="getTag(option.value)?.icon"
        :text="getTag(option.value)?.title"
        @click="onSelect"
        class="w-full hover:scale-95"
      />
    </template>
  </SelectAlt>
</template>

<script setup lang="ts">
import TagVue from "./Tag.vue";
import { Tag, TagOrder } from "~/models/Tag";
import _ from "lodash";
import { faTag } from "@fortawesome/free-solid-svg-icons";

interface TagSelecterProps {
  selected: number;
  label?: string;
  tags: Tag[];
  clearable?: boolean;
}

const props = defineProps<TagSelecterProps>();
const emit = defineEmits(["update:selected"]);

const tagOptions = computed(() =>
  _(props.tags)
    .chain()
    .sortBy((t) => TagOrder.get(t.color))
    .map((t) => ({
      text: t.title,
      value: String(t.id),
    }))
    .value()
);

const getTag = (tagId: string) => props.tags.find(t => t.id === Number(tagId));
const selectTag = (id: string) => {
  if (props.selected === Number(id)) emit("update:selected", -1);
  else emit("update:selected", Number(id));
};
</script>
