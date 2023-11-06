<template>
  <div class="text-sm drop-shadow-sm">
    <template v-if="syncStatus == SyncStatus.Syncing">
      <Spinner class="text-warning loading-xs" />
    </template>
    <template v-else-if="syncStatus == SyncStatus.Error">
      <FontAwesomeIcon :icon="faCircle" class="text-error" />
    </template>
    <template v-else>
      <FontAwesomeIcon :icon="faCircle" class="text-success" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { SyncStatus } from "~/data/models/Status";
import { useGeneralStore } from "~/data/stores/generalStore";

const store = useGeneralStore();
const { syncStatus } = storeToRefs(store);
</script>
