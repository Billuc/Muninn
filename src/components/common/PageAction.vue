<script setup lang="ts">
interface PageActionProps {
  icon?: string;
  label?: string;
  color?: string;
  textColor?: string;
}

const props = defineProps<PageActionProps>();
const emit = defineEmits(["click"]);

const onClick = () => emit("click");
</script>

<template>
  <QChip
    :icon="props.icon"
    :label="props.label"
    :color="props.color"
    :text-color="props.textColor"
    clickable
    @click="onClick"
    class="q-mx-sm"
  ></QChip>
</template>
