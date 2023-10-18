<template>
  <div>
    <PageHeading>Configuration</PageHeading>
    <Background :icon="faCog" />

    <ConfigPage />
  </div>
</template>

<script setup lang="ts">
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ConfigPage from "~/components/config/ConfigPage.vue";
import Background from "~/components/layout/Background.vue";
import PageHeading from "~/components/layout/PageHeading.vue";

useHead({
  title: "Configuration",
});
</script>
