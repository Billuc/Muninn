<script setup lang="ts">
import { useService } from "@/composables/useService";
import { Tag } from "@/data/models/Tag";
import { EventTagService } from "@/data/services/eventTagService";
import TagSelect from "@/components/common/tags/TagSelect.vue";
import { ref } from "vue";
import { useSubscription } from "@/composables/useSubscription";

interface EventTagSelectProps {
  modelValue: Tag | null;
  filterSelect?: boolean;
  label?: string;
}

const props = defineProps<EventTagSelectProps>();
const emit = defineEmits(["update:model-value"]);

const eventTagService = useService(EventTagService);
const data = await eventTagService.getAll();
const eventTags = ref(data);
useSubscription(eventTagService, eventTags);

const onUpdate = (v: Tag | null) => emit("update:model-value", v);
</script>

<template>
  <TagSelect
    :model-value="props.modelValue"
    :tags="eventTags"
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
