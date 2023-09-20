<template>
  <div :class="mergeClasses('px-4', 'flex', 'items-center', 'justify-between')">
    <Button
      :icon="faAngleLeft"
      @click="prevMonth"
      class="btn-circle btn-ghost btn-xs"
    />

    <span tabindex="0" class="text-base font-bold">{{ monthLabel }}</span>

    <Button
      :icon="faAngleRight"
      @click="nextMonth"
      class="btn-circle btn-ghost btn-xs"
    />
  </div>
</template>

<script setup lang="ts">
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Button from "~/components/Button.vue";

interface CalendarHeaderProps {
  date: Date;
}

const props = defineProps<CalendarHeaderProps>();
const emit = defineEmits(["nextMonth", "previousMonth"]);

const monthLabel = computed(() => format(props.date, "MMMM yyyy"));

const nextMonth = () => emit("nextMonth");
const prevMonth = () => emit("previousMonth");
</script>
