<script setup lang="ts">
interface DialogProps {
  modelValue: boolean;
}

const props = defineProps<DialogProps>();
const emit = defineEmits(["update:model-value", "submit"]);

const onUpdate = (v: boolean) => emit("update:model-value", v);
const onSubmit = () => emit("submit");
</script>

<template>
  <QDialog
    :model-value="props.modelValue"
    @update:model-value="onUpdate"
    position="bottom"
  >
    <QCard style="width: 700px; max-width: 100vw">
      <QCardSection>
        <div class="text-h6">
          <slot name="title"></slot>
        </div>
      </QCardSection>

      <QForm @submit.prevent="onSubmit">
        <QCardSection>
          <slot name="form"></slot>
        </QCardSection>

        <QCardActions align="right">
          <slot name="actions"></slot>
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>
</template>
