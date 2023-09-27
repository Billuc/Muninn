<template>
  <div class="form-control gap-y-2">
    <InputAlt
      label="List Name"
      placeholder="Enter name..."
      :value="props.name"
      :icon="faFont"
      @input="setName"
    />
  </div>
</template>

<script setup lang="ts">
import { faFont } from "@fortawesome/free-solid-svg-icons";
import InputAlt from "../InputAlt.vue";

interface ListFormProps {
  name: string;
}

const props = defineProps<ListFormProps>();
const emit = defineEmits(["update:name"]);

const setName = (newName: string) => emit("update:name", newName);
</script>
