<template>
  <div class="prose max-w-full">
    <Editor
      :value="props.value"
      :plugins="plugins"
      @change="onChange"
      :placeholder="props.placeholder"
      mode="split"
    />
  </div>
</template>

<script setup lang="ts">
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";

interface AltMarkdownEditorProps {
  value: string;
  placeholder?: string;
}

const props = defineProps<AltMarkdownEditorProps>();
const emit = defineEmits(["update:value"]);

const plugins = [gfm(), gemoji()];

const onChange = (v: string) => emit("update:value", v);
</script>

<style>
@import url("bytemd/dist/index.css");

.bytemd {
  @apply rounded-box;
}
</style>
