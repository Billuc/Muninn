<script setup lang="ts">
import { format, parse } from "date-fns";
import { computed } from "vue";

interface DateSelectProps {
  modelValue: Date;
}

const props = defineProps<DateSelectProps>();
const emit = defineEmits(["update:model-value"]);
const dateFormat = "yyyy-MM-dd";
const quasarDateFormat = "YYYY-MM-DD";

const dateValue = computed(() => format(props.modelValue, dateFormat));

const onUpdateDate = (v: any, _: any, __: any) =>
  typeof v == "string" &&
  emit("update:model-value", parse(v, dateFormat, new Date()));
</script>

<template>
  <QChip color="list-neutral" class="montserrat">
    <QPopupProxy cover transition-show="scale" transition-hide="scale">
      <QDate
        :model-value="dateValue"
        @update:model-value="onUpdateDate"
        :mask="quasarDateFormat"
        today-btn
      >
        <div class="row items-center justify-end">
          <QBtn v-close-popup label="Close" color="primary" flat />
        </div>
      </QDate>
    </QPopupProxy>

    <QIcon name="event" class="q-mr-sm" />
    {{ dateValue }}
  </QChip>
</template>
