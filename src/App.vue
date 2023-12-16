<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import { useQuasar } from "quasar";

useQuasar().dark.set(false);
</script>

<template>
  <Layout>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>
  </Layout>
</template>
