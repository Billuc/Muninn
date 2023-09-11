<template>
  <ClientOnly>
    <div v-if="showPrompt" class="toast z-20">
      <div class="alert alert-warning">
        <div>{{ message }}</div>

        <template v-if="ready || needRefresh">
          <Button v-if="needRefresh" @click="() => $pwa.updateServiceWorker()">
            Reload
          </Button>
          <Button
            @click="() => $pwa.cancelPrompt()"
            :icon="faRemove"
            class="!btn-xs btn-circle"
          />
        </template>
        <template v-else-if="showInstall">
          <Button @click="() => $pwa.install()">Install</Button>
          <Button @click="() => $pwa.cancelInstall()">Cancel</Button>
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button.vue";

const { $pwa } = useNuxtApp();
const ready = computed(() => $pwa?.offlineReady);
const needRefresh = computed(() => $pwa?.needRefresh);
const showInstall = computed(
  () => $pwa?.showInstallPrompt && !ready.value && !needRefresh.value
);
const showPrompt = computed(
  () => ready.value || needRefresh.value || showInstall.value
);

const message = computed(() => {
  switch (true) {
    case ready.value:
      return "App ready to work offline !";
    case needRefresh.value:
      return "New content available, click on reload button to update";
    case showInstall.value:
      return "Install Muninn on your device";
    default:
      return "This shouldn't happen !";
  }
});
</script>
