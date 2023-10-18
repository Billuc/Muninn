<template>
  <div class="flex flex-nowrap">
    <Button :icon="faRemove" class="btn-circle !btn-xs" @click="remove" />
  </div>
</template>

<script setup lang="ts">
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["remove"]);

const remove = () => emit("remove");
</script>
