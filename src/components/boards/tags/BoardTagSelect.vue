<script setup lang="ts">
import { useService } from "@/composables/useService";
import { BoardTagService } from "@/data/services/boardTagService";
import TagSelect from "@/components/common/tags/TagSelect.vue";
import { ref } from "vue";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";

interface BoardTagSelectProps {
  modelValue: ID;
  filterSelect?: boolean;
  label?: string;
}

const boardTagService = useService(BoardTagService);

const props = defineProps<BoardTagSelectProps>();
const emit = defineEmits(["update:model-value"]);

const data = await boardTagService.getAll();
const boardTags = ref(data);
useSubscription(boardTagService, boardTags);

const onUpdate = (v: ID) => emit("update:model-value", v);
</script>

<template>
  <TagSelect
    :model-value="props.modelValue"
    :tags="boardTags"
    @update:model-value="onUpdate"
    :label="props.filterSelect ? null : props.label"
    :standout="!!props.filterSelect"
    :rounded="!!props.filterSelect"
    :class="{ 'filter-select': props.filterSelect }"
    :hide-dropdown-icon="!!props.filterSelect"
  ></TagSelect>
</template>

<style>
.filter-select.q-field--auto-height.q-field--dense .q-field__control,
.filter-select.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 28px;
  padding-top: 0;
  padding-bottom: 0;
}

.filter-select.q-field--dense .q-field__marginal {
  height: 28px;
}
</style>
