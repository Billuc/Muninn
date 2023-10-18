<template>
  <ClientOnly>
    <div v-if="showPrompt" class="toast z-20">
      <div class="alert alert-info gap-2 whitespace-pre-wrap">
        <div>{{ message }}</div>

        <div>
          <template v-if="ready || needRefresh">
            <Button
              v-if="needRefresh"
              @click="() => $pwa.updateServiceWorker()"
              :icon="faRotateRight"
              class="ml-2 btn-warning"
            />
            <Button
              @click="() => $pwa.cancelPrompt()"
              :icon="faRemove"
              class="ml-2 btn-warning"
            />
          </template>
          <template v-else-if="showInstall">
            <Button
              @click="() => $pwa.install()"
              :icon="faDownload"
              class="ml-2 btn-warning"
            />
            <Button
              @click="() => $pwa.cancelInstall()"
              :icon="faRemove"
              class="ml-2 btn-warning"
            />
          </template>
        </div>
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
