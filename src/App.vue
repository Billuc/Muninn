<script setup lang="ts">
import { RouterView } from "vue-router";
import Layout from "@/components/layout/Layout.vue";
import { useQuasar } from "quasar";
import LoadingView from "@/views/LoadingView.vue";
import ThemeComponent from "./components/layout/ThemeComponent.vue";
import ErrorBoundary from "./components/layout/ErrorBoundary.vue";

useQuasar().dark.set(false);
</script>

<template>
  <Suspense>
    <ErrorBoundary>
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
    </ErrorBoundary>

    <template #fallback>
      <LoadingView />
    </template>
  </Suspense>
</template>
