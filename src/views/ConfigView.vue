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

    <ThemeCard />

    <ConfigFooter class="q-mt-md" />
  </div>
</template>
