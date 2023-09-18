<template>
  <label class="btn btn-sm swap">
    <input type="checkbox" :value="props.showChecked" @change="onChange" />

    <!-- true -->
    <div class="swap-on">
      <FontAwesomeIcon :icon="faEyeSlash" />
      <span class="hidden md:inline ml-1">Hide checked</span>
    </div>

    <!-- false -->
    <div class="swap-off">
      <FontAwesomeIcon :icon="faEye" />
      <span class="hidden md:inline ml-1">Show checked</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface ShowCheckedToggleProps {
  showChecked: boolean;
}

const props = defineProps<ShowCheckedToggleProps>();
const emit = defineEmits(["update:showChecked"]);

const onChange = (ev: any) => emit("update:showChecked", !props.showChecked);
</script>
