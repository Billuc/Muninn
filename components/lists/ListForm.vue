<template>
  <Form ref="form">
    <InputField
      label="List Name"
      placeholder="Enter name..."
      :value="props.name"
      :icon="faFont"
      @update:value="setName"
      :rules="[(v) => !!v]"
    />
  </Form>
</template>

<script setup lang="ts">
import { faFont } from "@fortawesome/free-solid-svg-icons";
import Form from "../Form.vue";
import InputField from "../InputField.vue";

interface ListFormProps {
  name: string;
}

const props = defineProps<ListFormProps>();
const emit = defineEmits(["update:name"]);
const form = ref<InstanceType<typeof Form> | null>(null);

const setName = (newName: string) => emit("update:name", newName);

const validate = () => form.value?.validate();
defineExpose({ validate });
</script>
