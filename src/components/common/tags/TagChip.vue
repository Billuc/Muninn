<script setup lang="ts">
import { Tag } from "@/data/models/Tag";
import { computed } from "vue";

interface TagChipProps {
  tag: Tag;
  dense?: boolean;
  noText?: boolean;
}

const props = defineProps<TagChipProps>();

const iconValue = computed(() => props.tag.icon.join(" "));
</script>

<template>
  <QChip
    :color="props.tag.color"
    :icon="iconValue"
    :label="props.noText ? undefined : props.tag.title"
    :class="{ 'dense-tag': props.dense, 'tag-no-text': props.noText }"
  />
</template>

<style>
.dense-tag {
  height: 1.25rem;
  margin: 0;
}

.tag-no-text {
  width: fit-content;
  padding: 0 0.5rem;
  margin: 0;
}

.tag-no-text .q-icon {
  margin: 0;
}
</style>
