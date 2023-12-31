<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import Select from "@/components/common/Select.vue";
import IconAutocomplete from "@/components/common/IconAutocomplete.vue";
import { TagColor } from "@/data/models/Tag";
import { required } from "@/utils/rules";
import { computed } from "vue";

interface EventFormProps {
  title: string;
  icon: string[];
  color: TagColor;
}

const props = defineProps<EventFormProps>();
const emit = defineEmits(["update:title", "update:icon", "update:color"]);

const tagColorOptions = Object.values(TagColor).map((c) => ({
  value: c,
  label: c,
}));
const iconValue = computed(() => props.icon.join(" "));

const onUpdateTitle = (v: string) => emit("update:title", v);
const onUpdateIcon = (v: string) => emit("update:icon", v.split(" "));
const onUpdateColor = (v: TagColor) => emit("update:color", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdateTitle"
      label="Tag name"
      :rules="[required]"
    />
    <IconAutocomplete
      label="Tag icon"
      :model-value="iconValue"
      @update:model-value="onUpdateIcon"
      :rules="[required]"
    />
    <Select
      label="Tag color"
      :rules="[required]"
      :model-value="props.color"
      @update:model-value="onUpdateColor"
      :options="tagColorOptions"
    >
      <template #option="{ option, selected }">
        <QChip
          :color="option.value"
          :label="option.label"
          :outline="!selected"
        />
      </template>
      <template #selected="{ option }">
        <QChip :color="option.value" :label="option.label" v-if="option" />
      </template>
    </Select>
  </div>
</template>
