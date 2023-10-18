<template>
  <label class="btn btn-sm swap">
    <input type="checkbox" :value="props.hideChecked" @change="onChange" />

    <!-- false -->
    <div class="swap-off">
      <FontAwesomeIcon :icon="faEyeSlash" />
      <span class="hidden md:inline ml-1">Hide checked</span>
    </div>

    <!-- true -->
    <div class="swap-on">
      <FontAwesomeIcon :icon="faEye" />
      <span class="hidden md:inline ml-1">Show checked</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ShowCheckedToggleProps {
  hideChecked: boolean;
}

const props = defineProps<ShowCheckedToggleProps>();
const emit = defineEmits(["update:hideChecked"]);

const onChange = (ev: any) => emit("update:hideChecked", !props.hideChecked);
</script>
