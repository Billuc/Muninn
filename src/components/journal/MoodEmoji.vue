<script setup lang="ts">
import { computed } from "vue";
import { ACTIVE_MOOD_ICONS, MOOD_ICONS } from "@/utils/journal";

interface MoodEmojiProps {
  value: number;
  active?: boolean;
  color: string;
}

const props = defineProps<MoodEmojiProps>();
const emit = defineEmits(["select"]);

const icon = computed(() =>
  props.active ? ACTIVE_MOOD_ICONS[props.value] : MOOD_ICONS[props.value]
);

const onClick = () => emit("select");
</script>

<template>
  <QIcon :name="icon" :color="props.color" @click="onClick" size="xl" />
</template>
