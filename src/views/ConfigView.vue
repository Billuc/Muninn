<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import ConfigFooter from "@/components/config/ConfigFooter.vue";
import ThemeCard from "@/components/config/ThemeCard.vue";
</script>

<template>
  <div>
    <Title>
      <template #text>Config</template>
    </Title>

    <div class="content-display">
      <ThemeCard />

      <ConfigFooter class="q-mt-md" />
    </div>
  </div>
</template>
