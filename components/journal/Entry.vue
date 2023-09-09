<template>
  <li class="m-0">
    <MultilineInput
      :value="entry"
      placeholder="Write here..."
      ref="input"
      @input="debouncedUpdate"
      class="w-full"
    />
  </li>
</template>

<script setup lang="ts">
import MultilineInput from "../MultilineInput.vue";

interface EntryProps {
  entry: string;
}

const props = defineProps<EntryProps>();
const emit = defineEmits(["update:entry"]);

const { entry } = toRefs(props);
const input = ref(null);

const debouncedUpdate = useDebounce((newValue: string) => {
  emit("update:entry", newValue);
  (input.value as any).resetContent();
}, 2000);
</script>
