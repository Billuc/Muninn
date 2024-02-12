<script setup lang="ts">
import { computed } from "vue";

interface EventToggleViewButtonProps {
  isCalendar?: boolean;
}

const props = defineProps<EventToggleViewButtonProps>();
const emit = defineEmits(["update:is-calendar"]);

const icon = computed(() =>
  !!props.isCalendar ? "mdi-timeline" : "mdi-calendar-today"
);

const onClick = () => emit("update:is-calendar", !props.isCalendar);
</script>

<template>
  <QBtn :icon="icon" round color="primary" @click="onClick" size="sm" />
</template>
