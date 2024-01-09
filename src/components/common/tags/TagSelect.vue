<script setup lang="ts">
import { Tag } from "@/data/models/Tag";
import Select from "@/components/common/Select.vue";
import TagChip from "@/components/common/tags/TagChip.vue";
import { computed } from "vue";
import { ID } from "@/data/models/ID";

interface TagSelectProps {
  tags: Tag[];
  modelValue: ID;
  label?: string | null;
}

const props = defineProps<TagSelectProps>();
const emit = defineEmits(["update:model-value"]);

const options = computed(() =>
  props.tags.map((tag) => ({ value: tag.id, label: tag }))
);

const onUpdate = (v: ID) => emit("update:model-value", v);
</script>

<template>
  <Select
    :label="props.label == null ? undefined : props.label ?? 'Tag'"
    :options="options"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    clearable
    @clear="() => onUpdate('')"
  >
    <template #option="{ option }">
      <TagChip :tag="option.label" class="q-ma-none" />
    </template>
    <template #selected="{ option }">
      <TagChip
        :tag="option.label"
        v-if="option"
        class="q-ma-none selected-tag"
      />
      <div v-else style="min-width: 100px; opacity: 0.7">
        {{ props.label == null ? "No tag selected" : "" }}
      </div>
    </template>
  </Select>
</template>

<style>
.selected-tag {
  height: 1.25rem;
}
</style>
