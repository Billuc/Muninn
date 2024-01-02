<script setup lang="ts">
import PageAction from "@/components/common/PageAction.vue";
import { computed } from "vue";

interface NoteModeToggleProps {
  editing: boolean;
}

const props = defineProps<NoteModeToggleProps>();
const emit = defineEmits(["update:editing"]);

const onClick = () => emit("update:editing", !props.editing);

const icon = computed(() => (props.editing ? "mdi-pencil" : "mdi-save"));
const label = computed(() => (props.editing ? "Edit mode" : "Save changes"));
</script>

<template>
  <PageAction color="primary" :icon="icon" :label="label" @click="onClick" />
</template>
