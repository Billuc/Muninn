<template>
  <div class="flex flex-nowrap">
    <Button :icon="faCheck" class="btn-circle !btn-xs" @click="validate" />
    <Button :icon="faCancel" class="btn-circle !btn-xs" @click="cancel" />
    <Button :icon="faRemove" class="btn-circle !btn-xs" @click="remove" />
  </div>
</template>

<script setup lang="ts">
import { faCancel, faCheck, faRemove } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["validate", "cancel", "remove"]);

const validate = () => emit("validate");
const cancel = () => emit("cancel");
const remove = () => emit("remove");
</script>
