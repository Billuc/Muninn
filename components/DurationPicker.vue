<template>
  <Dropdown :label-class="props.labelClass">
    <template #label>
      <span>{{ durationLabel }}</span>
    </template>

    <template #content>
      <div class="grid grid-cols-2 gap-2">
        <div class="overflow-y-scroll h-52">
          <div
            v-for="h in hours"
            :key="'hours-' + h"
            @click="() => onSelectHour(h)"
          >
            <div
              :class="
                mergeClasses(
                  'py-2',
                  'font-semibold',
                  'bg-base-100',
                  'hover:bg-base-300',
                  'mx-auto',
                  'w-full',
                  'drop-shadow-xl',
                  'border-0',
                  'text-center',
                  'rounded-box',
                  'mb-1'
                )
              "
            >
              {{ ("00" + h).slice(-2) }}
            </div>
          </div>
        </div>

        <div class="overflow-y-scroll h-52">
          <div
            v-for="m in minutes"
            :key="'minutes-' + m"
            @click="() => onSelectMinute(m)"
          >
            <div
              :class="
                mergeClasses(
                  'py-2',
                  'font-semibold',
                  'bg-base-100',
                  'hover:bg-base-300',
                  'mx-auto',
                  'w-full',
                  'drop-shadow-xl',
                  'border-0',
                  'text-center',
                  'rounded-box',
                  'mb-1'
                )
              "
            >
              {{ ("00" + m).slice(-2) }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "./Dropdown.vue";

interface DurationPickerProps {
  hours: number;
  minutes: number;
  labelClass: string;
}

const props = defineProps<DurationPickerProps>();
const emit = defineEmits(["update:hours", "update:minutes"]);

const hours = [...Array(24)].map((v, i) => i);
const minutes = [...Array(12)].map((v, i) => 5 * i);

const durationLabel = computed(
  () => ("00" + props.hours).slice(-2) + ":" + ("00" + props.minutes).slice(-2)
);

const onSelectHour = (hour: number) => emit("update:hours", hour);
const onSelectMinute = (minute: number) => emit("update:minutes", minute);
</script>
