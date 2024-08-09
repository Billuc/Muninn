<script setup lang="ts"></script>

<template>
  <QCard>
    <QCardSection>
      <slot></slot>
    </QCardSection>

    <QBtn
      icon="delete"
      color="primary"
      class="absolute card-delete"
      size="sm"
      round
    />
  </QCard>
</template>

<style>
.card-delete {
  top: -0.5rem;
  right: -0.5rem;
}
</style>
