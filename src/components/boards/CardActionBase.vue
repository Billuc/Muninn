<script setup lang="ts">
interface CardActionBaseProps {
  icon: string;
  color?: string;
  tooltip?: string;
}

const props = defineProps<CardActionBaseProps>();
const emit = defineEmits(["click"]);

const onClick = () => {
  emit("click");
};
</script>

<template>
  <QBtn
    :icon="props.icon"
    :color="props.color ?? 'primary'"
    size="sm"
    round
    @click="onClick"
  >
    <QTooltip>{{ props.tooltip ?? "" }}</QTooltip>
  </QBtn>
</template>
