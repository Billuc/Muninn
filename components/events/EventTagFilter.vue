<template>
  <LayoutLoading v-if="pending"/>
  <TagSelecter
    :tags="tags!"
    :selected="props.selected"
    label="Filter by Tag"
    @update:selected="selectTag"
    clearable
    v-else
  />
</template>

<script setup lang="ts">
import { type ID } from "~/data/models/ID";
import { EventTagService } from "~/data/services/eventTagService";

interface EventTagFilterProps {
  selected: ID;
}

const props = defineProps<EventTagFilterProps>();
const emit = defineEmits(["update:selected"]);
const service = useService(EventTagService);

const { pending, data: tags } = useLazyAsyncData("event-tags", () => service.getAll());

const selectTag = (id: ID) => emit("update:selected", id);
</script>
