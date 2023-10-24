<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0">
      <slot name="activator">
        <div class="btn btn-circle btn-sm">
          <FontAwesomeIcon :icon="faEllipsisVertical" />
        </div>
      </slot>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
