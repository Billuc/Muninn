<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import { useQuasar } from "quasar";
import LoadingView from "@/views/LoadingView.vue";
import ThemeComponent from "./components/layout/ThemeComponent.vue";

useQuasar().dark.set(false);
</script>

<template>
  <ThemeComponent>
    <Layout>
      <Suspense>
        <RouterView></RouterView>

        <template #fallback>
          <LoadingView />
        </template>
      </Suspense>
    </Layout>
  </ThemeComponent>
</template>
