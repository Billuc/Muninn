<template>
  <SelectField
    :label="props.label ?? 'Tag'"
    :icon="faTag"
    :options="tagOptions"
    :value="String(props.selected)"
    @update:value="selectTag"
    @clear="() => selectTag('-1')"
    :clearable="props.clearable"
    :placeholder="props.placeholder ?? 'Choose a tag'"
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

    <template #no-option>
      <div class="text-sm italic font-light text-center">
        No tag available. Check config page to create tags.
      </div>
    </template>
  </SelectField>
</template>

<script setup lang="ts">
import TagVue from "./TagVue.vue";
import { Tag, TagOrder } from "~/models/Tag";
import _ from "lodash";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import SelectField from "./SelectField.vue";
import { ID } from "~/models/ID";

interface TagSelecterProps {
  selected: ID;
  label?: string;
  tags: Tag[];
  clearable?: boolean;
  placeholder?: string;
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

const getTag = (tagId: string) => props.tags.find((t) => t.id === tagId);
const selectTag = (id: string) => {
  if (props.selected === id) emit("update:selected", "");
  else emit("update:selected", id);
};
</script>
