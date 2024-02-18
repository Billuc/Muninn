<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { computed } from "vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const message = computed(() => {
  if (offlineReady.value) return "App ready to work offline";
  else if (needRefresh.value)
    return "New content available, click on reload button to update.";
  else return "";
});
const bannerClasses = computed(() => {
  if (offlineReady.value) return "bg-positive text-white";
  else if (needRefresh.value) return "bg-secondary";
  else return "bg-primary";
});

async function close() {
  offlineReady.value = false;
  needRefresh.value = false;
}
</script>

<template>
  <QBanner
    inline-actions
    rounded
    :class="bannerClasses"
    v-if="offlineReady || needRefresh"
  >
    {{ message }}

    <template v-slot:action>
      <QBtn
        flat
        label="Reload"
        v-if="needRefresh"
        @click="updateServiceWorker()"
      />
      <QBtn flat label="Close" @click="close" />
    </template>
  </QBanner>
</template>
