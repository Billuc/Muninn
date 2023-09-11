<template>
  <ClientOnly>
    <div v-if="showPrompt" class="toast z-20">
      <div class="alert alert-warning">
        <div>{{ message }}</div>

        <template v-if="ready || needRefresh">
          <Button
            v-if="needRefresh"
            @click="() => $pwa.updateServiceWorker()"
            :icon="faRotateRight"
          />
          <Button
            @click="() => $pwa.cancelPrompt()"
            :icon="faRemove"
            class="!btn-xs btn-circle"
          />
        </template>
        <template v-else-if="showInstall">
          <Button @click="() => $pwa.install()" :icon="faDownload" />
          <Button @click="() => $pwa.cancelInstall()" :icon="faRemove" />
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  faDownload,
  faRemove,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
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
      return "New content available, reload to update";
    case showInstall.value:
      return "Install Muninn on your device ?";
    default:
      return "This shouldn't happen !";
  }
});
</script>
