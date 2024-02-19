<script setup lang="ts">
import { useService } from "@/composables/useService";
import { NoteTagService } from "@/data/services/noteTagService";
import TagSelect from "@/components/common/tags/TagSelect.vue";
import { ref } from "vue";
import { useSubscription } from "@/composables/useSubscription";
import { ID } from "@/data/models/ID";

interface NoteTagSelectProps {
  modelValue: ID;
  filterSelect?: boolean;
  label?: string;
}

const props = defineProps<NoteTagSelectProps>();
const emit = defineEmits(["update:model-value"]);

const noteTagService = useService(NoteTagService);
const data = await noteTagService.getAll();
const noteTags = ref(data);
useSubscription(noteTagService, noteTags);

const onUpdate = (v: ID) => emit("update:model-value", v);
</script>

<template>
  <TagSelect
    :model-value="props.modelValue"
    :tags="noteTags"
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
