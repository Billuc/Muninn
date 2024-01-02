<script setup lang="ts">
import { QCard } from "quasar";
import MoodEmoji from "./MoodEmoji.vue";
import { MOOD_COLORS } from "@/utils/journal";

interface MoodSelectProps {
  modelValue: number;
}

const props = defineProps<MoodSelectProps>();
const emit = defineEmits(["update:model-value"]);

const onSelect = (v: number) => emit("update:model-value", v);
</script>

<template>
  <QCard flat>
    <QCardSection>
      <div class="text-center">Your mood today</div>
      <div class="row justify-between">
        <MoodEmoji
          v-for="i in 5"
          :key="i"
          :value="i"
          :color="MOOD_COLORS[i]"
          :active="props.modelValue == i"
          @select="() => onSelect(i)"
        />
      </div>
    </QCardSection>
  </QCard>
</template>
