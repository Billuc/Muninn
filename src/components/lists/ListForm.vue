<script setup lang="ts">
import Input from "@/components/common/Input.vue";
import { required } from "@/utils/rules";

interface ListFormProps {
  title: string;
}

const props = defineProps<ListFormProps>();
const emit = defineEmits(["update:title"]);

const onUpdate = (v: string) => emit("update:title", v);
</script>

<template>
  <div>
    <Input
      :model-value="props.title"
      @update:model-value="onUpdate"
      label="List name"
      :rules="[required]"
    />
  </div>
</template>
