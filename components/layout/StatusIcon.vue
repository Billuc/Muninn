<template>
  <div>
    <template v-if="syncStatus == SyncStatus.Syncing">
      <Spinner class="text-warning loading-xs" />
    </template>
    <template v-else-if="syncStatus == SyncStatus.Synced">
      <FontAwesomeIcon :icon="faCheck" class="text-success" />
    </template>
    <template v-else>
      <FontAwesomeIcon :icon="faClose" class="text-error" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { SyncStatus } from "~/models/Status";
import { useGeneralStore } from "~/stores/generalStore";

const store = useGeneralStore();
const { syncStatus } = storeToRefs(store);
</script>
