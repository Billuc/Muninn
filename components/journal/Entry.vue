<template>
  <li class="m-0">
    <MultilineField
      :value="entry"
      placeholder="Write here..."
      @input="debouncedUpdate"
      class="w-full"
    />
  </li>
</template>

<script setup lang="ts">
import MultilineField from "../MultilineField.vue";

interface EntryProps {
  entry: string;
}

const props = defineProps<EntryProps>();
const emit = defineEmits(["update:entry"]);

const { entry } = toRefs(props);

const debouncedUpdate = useDebounce((newValue: string) => {
  emit("update:entry", newValue.trim());
}, 2000);
</script>
