<script setup lang="ts">
import { Tag } from "@/data/models/Tag";
import Select from "@/components/common/Select.vue";
import TagChip from "@/components/common/tags/TagChip.vue";
import { computed } from "vue";

interface TagSelectProps {
  tags: Tag[];
  modelValue: Tag | null;
  label?: string | null;
}

const props = defineProps<TagSelectProps>();
const emit = defineEmits(["update:model-value"]);

const options = computed(() =>
  props.tags.map((tag) => ({ value: tag, label: tag.title }))
);

const onUpdate = (v: Tag | null) => emit("update:model-value", v);
</script>

<template>
  <Select
    :label="props.label == null ? undefined : props.label ?? 'Tag'"
    :options="options"
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    clearable
    @clear="() => onUpdate(null)"
  >
    <template #option="{ option }">
      <TagChip :tag="option.value" class="q-ma-none" />
    </template>
    <template #selected="{ option }">
      <TagChip :tag="option.value" v-if="option" class="q-ma-none" />
      <div v-else style="min-width: 100px; opacity: 0.7">
        {{ props.label == null ? "No tag selected" : "" }}
      </div>
    </template>
  </Select>
</template>
