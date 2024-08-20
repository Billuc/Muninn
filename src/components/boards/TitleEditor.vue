<script setup lang="ts">
interface TextEditorProps {
  modelValue: string;
  placeholder?: string;
}

const props = defineProps<TextEditorProps>();
const emit = defineEmits(["update:model-value"]);

function onTextChange(v: string | null) {
  emit("update:model-value", v ?? "");
}
</script>

<template>
  <div>
    {{ props.modelValue }}

    <QPopupEdit
      :model-value="props.modelValue"
      v-slot="scope"
      @save="onTextChange"
    >
      <div class="row items-center">
        <QInput
          v-model="scope.value"
          dense
          autofocus
          @keyup.enter="scope.set"
          clearable
          class="col q-mr-sm"
          color="primary-text"
        />
      </div>
    </QPopupEdit>
  </div>
</template>
