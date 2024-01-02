<script setup lang="ts">
import { Tag } from "@/data/models/Tag";
import { computed } from "vue";

interface TagChipProps {
  tag: Tag;
}

const props = defineProps<TagChipProps>();

const iconValue = computed(() => props.tag.icon.join(" "));
</script>

<template>
  <QChip :color="props.tag.color" :icon="iconValue" :label="props.tag.title" />
</template>
