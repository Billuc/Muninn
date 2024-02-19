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
    class="form-dialog"
  >
    <QCard
      style="width: 700px; max-width: 100vw"
      class="montserrat bg-background"
    >
      <QCardSection>
        <div class="text-h6">
          <slot name="title"></slot>
        </div>
      </QCardSection>

      <QForm @submit.prevent="onSubmit">
        <div class="q-px-md form-content">
          <slot name="form"></slot>
        </div>

        <QCardActions align="right">
          <slot name="actions"></slot>
        </QCardActions>
      </QForm>
    </QCard>
  </QDialog>
</template>

<style>
.form-content > div {
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
}
</style>
