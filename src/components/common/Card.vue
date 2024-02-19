<script setup lang="ts">
interface CardProps {
  title: string;
}

const props = defineProps<CardProps>();
</script>

<template>
  <QCard class="card bg-background">
    <div class="card-title">
      <QChip color="primary">{{ props.title }}</QChip>
    </div>

    <QCardSection>
      <slot></slot>
    </QCardSection>
  </QCard>
</template>

<style>
.card {
  position: relative;
  box-shadow: 4px 4px 0px var(--q-primary), 0px 0px 4px var(--q-primary);
  margin-top: 16px;
  padding-top: 4px;
}

.card .card-title {
  position: absolute;
  top: 0;
  left: 16px;
  transform: translateY(-50%);

  text-transform: uppercase;
  font-weight: bold;
}
</style>
