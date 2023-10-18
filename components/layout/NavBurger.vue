<template>
  <div tabindex="0" class="btn btn-square btn-ghost md:btn-lg">
    <FontAwesomeIcon :icon="faBars" />
  </div>
</template>

<script setup lang="ts">
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
