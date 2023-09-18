<template>
  <div class="flex items-center gap-x-2 overflow-x-auto p-2">
    <div class="font-bold whitespace-nowrap">
      {{ props.label ?? "Frequency :" }}
    </div>
    
    <FrequencyVue
      v-for="freq in frequencies"
      :frequency="freq"
      @click="() => selectFrequency(freq)"
      :class="{
        'outline outline-2 outline-offset-1 outline-neutral':
          props.frequency === freq,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { Frequency } from "~/models/Event";
import FrequencyVue from "./FrequencyVue.vue";

interface FrequencySelecterProps {
  frequency: Frequency;
  label?: string;
}

const props = defineProps<FrequencySelecterProps>();
const emit = defineEmits(["update:frequency"]);

const frequencies = Object.values(Frequency);

const selectFrequency = (freq: Frequency) => {
  emit("update:frequency", freq);
};
</script>
