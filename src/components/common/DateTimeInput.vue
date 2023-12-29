<script setup lang="ts">
import parse from "date-fns/parse";
import format from "date-fns/format";
import { computed } from "vue";

interface DateTimeInputProps {
  modelValue: Date | null;
  clearable?: boolean;
}

const props = defineProps<DateTimeInputProps>();
const emit = defineEmits(["update:model-value"]);
const dateFormat = "yyyy-MM-dd HH:mm";
const quasarDateFormat = "YYYY-MM-DD HH:mm";

const dateValue = computed(() =>
  props.modelValue ? format(props.modelValue, dateFormat) : ""
);

const onUpdateInput = (v: string | number | null) =>
  typeof v == "string" && emit("update:model-value", parse(v, dateFormat, new Date()));
const onUpdateDate = (v: any, _: any, __: any) =>
  typeof v == "string" && emit("update:model-value", parse(v, dateFormat, new Date()));
const onUpdateTime = (v: string | null, _: any) =>
  !!v && emit("update:model-value", parse(v, dateFormat, new Date()));
const onClear = () => emit("update:model-value", null);
</script>

<template>
  <QInput
    filled
    :model-value="dateValue"
    @update:model-value="onUpdateInput"
    :clearable="props.clearable"
    @clear="onClear"
    dense
    hide-bottom-space
  >
    <template v-slot:prepend>
      <QIcon name="event" class="cursor-pointer">
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
      </QIcon>
    </template>

    <template v-slot:append>
      <QIcon name="access_time" class="cursor-pointer">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime
            :model-value="dateValue"
            @update:model-value="onUpdateTime"
            :mask="quasarDateFormat"
            format24h
            now-btn
          >
            <div class="row items-center justify-end">
              <QBtn v-close-popup label="Close" color="primary" flat />
            </div>
          </QTime>
        </QPopupProxy>
      </QIcon>
    </template>
  </QInput>
</template>
