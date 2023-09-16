<template>
  <dialog class="modal" ref="modalRef" @keydown.esc.prevent="closeModal">
    <div class="modal-box overflow-y-visible">
      <div :class="mergeClasses('text-lg', 'font-bold')">
        <slot name="title"></slot>
      </div>

      <div :class="mergeClasses('p-2')">
        <slot></slot>
      </div>

      <div
        :class="
          mergeClasses('flex', 'flex-row', 'flex-nowrap', 'justify-end', 'mt-2')
        "
      >
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="modal-backdrop">
      <button @click="closeModal">close</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface DialogProps {
  isOpened: boolean;
}

const props = defineProps<DialogProps>();
const emit = defineEmits(["close"]);
const { isOpened } = toRefs(props);
const modalRef = ref(null);

watchEffect(() => {
  const dialog = modalRef.value as unknown as HTMLDialogElement | undefined;

  if (!dialog) return;

  if (isOpened.value) dialog.showModal();
  else dialog.close();
});

function closeModal() {
  emit("close");
}
</script>
