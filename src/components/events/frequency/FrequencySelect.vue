<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import Select from "@/components/common/Select.vue";
import { Frequency } from "@/data/models/Event";
import { isNumber, required } from "@/utils/rules";
import { computed, ref } from "vue";

interface FrequencySelectProps {
  frequency: Frequency;
  multiplier: number;
}

const props = defineProps<FrequencySelectProps>();
const emit = defineEmits(["update:frequency", "update:multiplier"]);

const repeatable = computed(() => props.frequency != Frequency.Once);

const frequencyOptions = [
  { label: "days", value: Frequency.Daily },
  { label: "weeks", value: Frequency.Weekly },
  { label: "months", value: Frequency.Monthly },
  { label: "years", value: Frequency.Yearly },
];
const selectedRepeatableFrequency = ref(
  repeatable.value ? props.frequency : Frequency.Daily
);

const onToggle = (v: boolean) => {
  if (!v) emit("update:frequency", Frequency.Once);
  else emit("update:frequency", selectedRepeatableFrequency.value);
};
const onUpdateFrequency = (f: Frequency) => {
  selectedRepeatableFrequency.value = f;
  emit("update:frequency", f);
};
const onUpdateMultiplier = (v: string | number | null) =>
  emit("update:multiplier", Number(v));
</script>

<template>
  <div class="row items-center">
    <QToggle
      label="Repeatable"
      left-label
      :model-value="repeatable"
      @update:model-value="onToggle"
    />

    <template v-if="repeatable">
      <div>Every</div>
      <QSpace />
      <Input
        :model-value="props.multiplier"
        @update:model-value="onUpdateMultiplier"
        class="multiplier-input"
        :rules="[required, isNumber]"
        label=""
      />
      <QSpace />
      <Select
        :options="frequencyOptions"
        :model-value="props.frequency"
        @update:model-value="onUpdateFrequency"
        class="frequency-select"
        :rules="[required]"
      />
    </template>
  </div>
</template>

<style>
.multiplier-input {
  width: 40px;
}

.multiplier-input input {
  padding: 8px 0 !important;
}

.frequency-select {
  width: 100px;
}
</style>
