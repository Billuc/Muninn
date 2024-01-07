<script setup lang="ts">
import { ref } from "vue";

interface ColorPickerProps {
  modelValue: string;
}

const props = defineProps<ColorPickerProps>();
const emit = defineEmits(["update:model-value"]);

const menuOpened = ref(false);
const colorPicked = ref(props.modelValue);

const onCancel = () => {
  menuOpened.value = false;
  colorPicked.value = props.modelValue;
};
const onSave = () => {
  emit("update:model-value", colorPicked.value);
  menuOpened.value = false;
};
const onUpdate = (value: string) => (colorPicked.value = value);
</script>

<template>
  <QBtn :style="{ background: props.modelValue }">
    <QMenu v-model="menuOpened">
      <div class="row bg-background">
        <QSpace />
        <QBtn icon="mdi-close" color="negative" @click="onCancel" />
        <QBtn icon="mdi-check" color="positive" @click="onSave" />
      </div>

      <QColor :model-value="colorPicked" @change="onUpdate"></QColor>
    </QMenu>
  </QBtn>
</template>
